import { createRouter, createWebHashHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:'/',
      name:'home',
      component:TodoList
    },
    {
      path:'/userlists',
      name:'UserLists',
      component:()=>import('../components/UserLists.vue')
    }
  ]
})

export default router
