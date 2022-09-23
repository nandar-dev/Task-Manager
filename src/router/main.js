import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Assignments.vue';
import MyAssignment from '../components/MyAssignment.vue'

const routes = [{
    name: "home",
    component: Home,
    path: "/"
},
{
    name: "my-assignment",
    component: MyAssignment,
    path: "/my-assignment"
}]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
