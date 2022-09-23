<template>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group>
    <el-menu style="transition: all ease" unique-opened mode="vertical" default-active="2" class="el-menu-vertical-demo"
        :collapse="isCollapse" @open="handleOpen" @close="handleClose">

        <el-menu-item index="2">
            <el-icon>
                <icon-menu />
            </el-icon>
            <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <el-icon>
                <document />
            </el-icon>
            <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>Navigator Four</template>
        </el-menu-item>
    </el-menu>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
export default {
    components: {
        Document,
        IconMenu,
        Location,
        Setting
    },
    setup() {
        const state = reactive({
            isCollapse: true
        })

        function handleOpen(key, keyPath) {
            console.log(key, keyPath);
        }
        function handleClose(key, keyPath) {
            console.log(key, keyPath);
        }

        return {
            ...toRefs(state),
            handleOpen,
            handleClose
        }
    }
}

</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu-vertical-demo {
    height: 100%;
}
</style>