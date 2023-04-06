<template>
  <div class="content">
    <h3>Today Task: Im Progress</h3>
    <div
      v-for="item in getAssign"
      :key="item"
      style="text-align: center"
      @click="onCompleteTask(item)">
      <el-checkbox v-model="item.complete" size="large" :label="item.title" />
    </div>

    <!-- <el-row :gutter="20">
            <el-col :span="2">
                <el-checkbox size="large" />
            </el-col>
            <el-col :span="5" style="text-align: left; margin-top: 7px;">
                <div>{{item.title}}</div>
            </el-col>
        </el-row> -->
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      tableData: [],
    });
    const store = useStore();
    const getAssign = computed(() => {
      return store.getters.getAssignment;
    });

    function getUncompleteList() {
      let list = [];
      for (var i = 0; i < store.getters.getAssignment.length; i++) {
        list.push({ ...store.getters.getAssignment[i], complete: false });
      }
      console.log(list);
      return list;
    }

    function onCompleteTask(val) {
      const data = {
        id: val.id,
        title: val.title,
        assignedto: val.assignedto,
        status: val.status,
        desc: val.desc,
        date: val.date,
        complete: !val.complete,
      };
      console.log(data);
      axios
        .put(
          "https://task-manager-api-ku16.onrender.com/assignment/" + val.id,
          data
        )
        .then((response) => {
          if (response.status == 200) {
            store.dispatch("fetchAssignment");
          }
        })
        .catch((err) => {
          ElMessage.error("Something went wrong");
        });
    }

    onMounted(() => {
      store.dispatch("fetchAssignment");
      getUncompleteList();
    });

    return {
      ...toRefs(state),
      store,
      getAssign,
      getUncompleteList,
      onCompleteTask,
    };
  },
};
</script>

<style scoped>
.content {
  padding: 30px 100px;
  text-align: center;
}
</style>
