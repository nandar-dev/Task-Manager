<template>
    <div class="content">
        <h3> Today Task: Im Progress</h3>
        <div v-for="item in getAssign" :key="item" style="text-align: center">
            <el-checkbox size="large" :label="item.title" />
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
import { ref, reactive, toRefs, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const state = reactive({
            tableData: []
        });
        const store = useStore();
        const getAssign = computed(() => {
            return store.getters.getAssignment;
        });

        // const getUncompleteList = (() => {
        //     let list = [];
        //     for (var i = 0; i < store.getters.getAssignment.length; i++) {
        //         list.push({ ...store.getters.getAssignment[i], complete: false })
        //     }
        //     console.log(list)
        //     return list;
        // })

        function getUncompleteList() {
            let list = [];
            for (var i = 0; i < store.getters.getAssignment.length; i++) {
                list.push({ ...store.getters.getAssignment[i], complete: false })
            }
            console.log(list)
            return list;
        }
 


        onMounted(() => {
            store.dispatch("fetchAssignment");
            getUncompleteList()


        });

        return {
            ...toRefs(state),
            store,
            getAssign,
            getUncompleteList
        }
    }
}

</script>

<style scoped>
.content {
    padding: 30px 100px;
    text-align: center;
}
</style>