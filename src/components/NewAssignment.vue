<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="40%"
    draggable
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-form
      ref="formRef"
      :model="Form"
      hide-required-asterisk="true"
      class="demo-ruleForm"
    >
      <h4>Title</h4>
      <el-form-item
        prop="title"
        :rules="[{ required: true, message: 'Title is required' }]"
      >
        <el-input v-model.number="Form.title" type="text" autocomplete="off" />
      </el-form-item>
      <div class="form-content assign">
        <h4>Assign To</h4>

        <el-select
          v-model="Form.assignto"
          clearable="true"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your article"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="form-content status">
        <h4>Status</h4>

        <el-radio-group v-model="Form.radio" size="small">
          <el-radio-button label="Normal" />
          <el-radio-button label="Important" />
        </el-radio-group>
      </div>

      <div>
        <h4>Description</h4>
        <el-input v-model="Form.desc" :rows="2" type="textarea" />
      </div>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" v-if="!isSubmit" @click="submit(formRef)"
          >Confirm</el-button
        >
        <el-button type="primary" v-else loading>Loading</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import ElementPlus from "element-plus";
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";
const store = useStore();
const isSubmit = ref(false);
const dialogTitle = ref("");

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  formStatus: {
    type: Text,
  },
  forUpdate: {
    type: Object,
  },
});
const emit = defineEmits(["update:dialogVisible"]);

const options = [
  {
    value: "Jhon",
    label: "Jhon",
  },
  {
    value: "Peter",
    label: "Peter",
  },
  {
    value: "Bob",
    label: "Bob",
  },
];

const formRef = ref(ElementPlus.FormInstance);

const Form = reactive({
  id: "",
  title: "",
  assignto: "",
  radio: "Normal",
  desc: "",
  date: "",
});

onMounted(() => {
  if (props.formStatus == "Update") {
    Form.id = props.forUpdate.id;
    Form.title = props.forUpdate.title;
    Form.assignto = [props.forUpdate.assignedto];
    Form.radio = props.forUpdate.status;
    Form.desc = props.forUpdate.desc;
    Form.date = props.forUpdate.date;
    dialogTitle.value = "Update Assignment";
  } else {
    dialogTitle.value = "New Assignment";
  }
  console.log(Form);
});

function cancel() {
  props.dialogVisible = false;
  emit("update:dialogVisible", false);
}

function submit(FormInstance) {
  if (!FormInstance) return;
  FormInstance.validate((valid) => {
    if (valid) {
      isSubmit.value = true;

      if (props.formStatus == "New") {
        const data = {
          id: Math.random() * 10000,
          title: Form.title,
          assignedto: Form.assignto[0],
          status: Form.radio,
          desc: Form.desc,
          date: "2016-05-04",
        };
        console.log(data);
        axios
          .post("http://localhost:4000/assignment", data)
          .then((response) => {
            if (response.status == 201) {
              cancel();
              isSubmit.value = false;
              store.dispatch("fetchAssignment");
              ElMessage.success(
                "New assignment added to " + data.assignedto + " successfully."
              );
              // reset form
              Form.assignto = "";
              Form.title = "";
              Form.desc = "";
              Form.radio = "Normal";
            }
          })
          .catch((err) => {
            isSubmit.value = false;
            ElMessage.error("Something went wrong");
          });
        //For Update -------------------
      } else {
        const data = {
          id: Form.id,
          title: Form.title,
          assignedto: Form.assignto[0],
          status: Form.radio,
          desc: Form.desc,
          date: Form.date,
        };
        console.log(data);
        axios
          .put("http://localhost:4000/assignment/" + Form.id, data)
          .then((response) => {
            isSubmit.value = false;
            if (response.status == 200) {
              cancel();
              store.dispatch("fetchAssignment");
              ElMessage.success("Update assignment successfully.");
              // reset form
              Form.assignto = "";
              Form.title = "";
              Form.desc = "";
              Form.radio = "Normal";
            }
          })
          .catch((err) => {
            isSubmit.value = false;
            ElMessage.error("Something went wrong");
          });
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
}
</script>

<style>
h4 {
  margin: 0px 0 4px 0;
  padding: 0;
}

.form-content {
  margin-bottom: 16px;
}
.form {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.el-form-item__content {
  width: 400px;
}
.el-select {
  width: 100%;
}
</style>
