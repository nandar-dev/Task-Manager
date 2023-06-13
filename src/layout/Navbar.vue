<template>
  <el-menu
    :class="
      store.state.theme.theme == 'dark' ? 'el-menu-demo dark' : 'el-menu-demo'
    "
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect">
    <router-link to="/">
      <el-menu-item class="title" index="0">{{
        store.state.title
      }}</el-menu-item>
    </router-link>
    <div class="flex-grow" />

    <el-menu-item index="1">
      <router-link to="/">
        <el-link type="primary">Home</el-link>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/my-assignment">
        <el-link type="primary">My Assignments</el-link>
      </router-link>
    </el-menu-item>
    <el-menu-item index="3">
      Dark &nbsp;
      <el-switch v-model="darkmode" />
    </el-menu-item>
  </el-menu>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const darkmode = ref(false);

    onMounted(() => {
      let getTheme = localStorage.getItem("theme") || "light";

      if (getTheme === "dark") {
        darkmode.value = true;
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.setAttribute("class", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.setAttribute("class", "light");
      }
    });

    watch(
      () => darkmode.value,
      (newVal, oldVal) => {
        if (darkmode.value) {
          store.dispatch("setTheme", "dark");
          localStorage.setItem("theme", "dark");
          document.documentElement.setAttribute("data-theme", "dark");
          document.documentElement.setAttribute("class", "dark");
        } else {
          store.dispatch("setTheme", "light");
          localStorage.setItem("theme", "light");
          document.documentElement.setAttribute("data-theme", "light");
          document.documentElement.setAttribute("class", "light");
        }
      }
    );

    return {
      store,
      darkmode,
    };
  },
};
</script>

<style scoped>
.title {
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;
}
.flex-grow {
  flex-grow: 1;
}

.dark {
  background-color: #726b7c;
  border-bottom: #726b7c;
  color: white;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: transparent;
}
</style>
