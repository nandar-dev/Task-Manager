<template>
  <div :class="theme == 'dark' ? 'header dark' : 'header'">
    <h2>Assignments ( {{ getAssign.length }} )</h2>
    <div class="add-assign">
      <el-button type="primary" @click="addNewAssign">Add New </el-button>
    </div>
  </div>
  <!-- <el-button type="primary" @click="addNewAssign">Add New </el-button> -->
  <NewAssignment v-if="addNew == true" :dialogVisible="addNew" @update:dialogVisible="updateDialog"
    :formStatus="formStat" :forUpdate="forUpdateData" />

  <div class="content">
    <el-card shadow="always">
      <el-table ref="filterTable" v-loading="getAssign.length == 0" :data="filterTableData" stripe style="width: 100%">
        <el-table-column sortable prop="title" label="Title" width="180" />
        <el-table-column prop="assignedto" label="Assignee" width="180" />
        <!-- <el-table-column prop="status" label="status" width="180" /> -->

        <el-table-column prop="status" label="Status" width="180" :filters="[
          { text: 'Normal', value: 'Normal' },
          { text: 'Important', value: 'Important' },
        ]" :filter-method="filterTag" filter-placement="bottom-end">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'Normal' ? '' : 'warning'" disable-transitions>{{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="desc" label="Description" />
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button size="small" @click="updateAssign(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="deleteAssign(scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;">
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>

  <!-- dialog -->

  <el-dialog v-model="centerDialogVisible" title="Delete?" width="30%" align-center>
    <p>
      <span><b>{{ forDeleteValue.title }} </b>
      </span>
      will be deleted permanently.
    </p>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="danger" v-if="!isDeleting" @click="confirmDelete">Delete</el-button>

        <el-button type="danger" v-else loading>Deleting</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, onMounted, computed, defineComponent, reactive, toRefs } from "vue";
import NewAssignment from "./NewAssignment.vue";
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";
import theme from "../store/modules/theme";

export default defineComponent({
  props: {},
  components: {
    NewAssignment,
  },

  setup() {

    const state = reactive({
      filtered: [],
      search: '',
      page: 1,
      pageSize: 2,
      total: 0,
    })

    const store = useStore();
    const theme = computed(() => store.state.theme.theme)
    const formStat = ref("");
    const addNew = ref(false);
    const forUpdateData = ref({});
    const centerDialogVisible = ref(false);
    const forDeleteValue = ref({});
    const isDeleting = ref(false);
    const filterTable = ref();

    const getAssign = computed(() => {
      return store.getters.getAssignment;
    });

    const assignments = computed(() => {
      return store.state.assignments;
    });

    const search = ref("");
    const filterTableData = computed(() => {
      state.filtered = store.state.assignments.filter(
        (data) =>
          !search.value ||
          data.title.toLowerCase().includes(search.value.toLowerCase())
      )
      state.total = state.filtered.length;
      return state.filtered.slice(
        state.pageSize * state.page - state.pageSize,
        state.pageSize * state.page
      );
    }

    );
    function handleCurrentChange(val) {
      state.page = val;
      // $refs.filterTable.clearFilter();
      filterTable.value.clearFilter();
    }

    function filterTag(value, row) {
      return row.status === value;
    }

    function addNewAssign() {
      addNew.value = true;
      formStat.value = "New";
    }

    function updateAssign(value) {
      addNew.value = true;
      formStat.value = "Update";
      console.log(value);
      forUpdateData.value = value;
    }

    function updateDialog(newval) {
      addNew.value = newval;
    }

    function deleteAssign(value) {
      forDeleteValue.value = value;
      centerDialogVisible.value = true;
    }
    function confirmDelete() {
      isDeleting.value = true;
      axios
        .delete("http://localhost:4000/assignment/" + forDeleteValue.id)
        .then((response) => {
          if (response.status == 200) {
            store.dispatch("fetchAssignment").then((res) => {
              isDeleting.value = false;
              ElMessage.success("Deleted assignment successfully.");
              centerDialogVisible.value = false;
            });
          }
        })
        .catch((err) => {
          isDeleting.value = false;
        });
    }
    onMounted(() => {
      store.dispatch("fetchAssignment");
    });

    return {
      ...toRefs(state),
      getAssign,
      assignments,
      filterTableData,
      search,
      addNew,
      formStat,
      forUpdateData,
      centerDialogVisible,
      isDeleting,
      filterTable,
      theme,
      addNewAssign,
      updateAssign,
      deleteAssign,
      confirmDelete,
      updateDialog,
      filterTag,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped>
.content {
  margin: 15px 100px;
}

.header {
  display: grid;
  grid-template-columns: auto auto;
  padding: 0 100px;
}

.dark {
  color: #73b8e1;
}

.header h2 {
  margin-top: 88px;
}

.add-assign {
  text-align: right;
  margin-top: 90px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
