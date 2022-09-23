<template>
  <el-table :data="displayData" style="width: 100%">
    <el-table-column prop="title" label="Title"> </el-table-column>
  </el-table>

  <el-divider></el-divider>

  <div style="text-align: center">
    <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  data() {

    return {
      filtered: [],
      search: '',
      page: 1,
      pageSize: 2,
      total: 0,
      store: useStore()
    }; 
  },
  mounted(){
    this.store.dispatch("fetchAssignment");
  },
  computed: {
    displayData() {
      if (this.search == null) return this.$store.state.assignments;

      this.filtered = this.$store.state.assignments.filter(
        (data) =>
          !this.search ||
          data.title.toLowerCase().includes(this.search.toLowerCase())
      );

      this.total = this.filtered.length;
      return this.filtered.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
    },
  },


};
</script>