<script>
import Navbar from './layout/Navbar.vue';
import Sidebar from './layout/Sidebar.vue';
export default {
  components: { Navbar,Sidebar },
  setup() {
   
  },


}

</script>
    
<template>
  <Navbar />
  <router-view></router-view>
  <!-- <Sidebar/> -->
</template>
    
