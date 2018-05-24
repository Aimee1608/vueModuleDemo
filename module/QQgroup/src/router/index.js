import Vue from 'vue'
import Router from 'vue-router'
import list from '../pages/list.vue'
import add from '../pages/add.vue'
import addMore from '../pages/addMore.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: list
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/add',
      name: 'add',
      component: add
    },
    {
      path: '/addMore',
      name: 'addMore',
      component: addMore
    }
  ]
})
