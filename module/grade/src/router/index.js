import Vue from 'vue'
import Router from 'vue-router'
import gradeList from '../pages/gradeList.vue'
import addGrade from '../pages/addGrade.vue'
import gradeRule from '../pages/gradeRule.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'gradeList',
      component: gradeList
    },
    {
      path: '/gradeList',
      name: 'gradeList',
      component: gradeList
    },
    {
      path: '/addGrade',
      name: 'addGrade',
      component: addGrade
    },
    {
      path: '/gradeRule',
      name: 'gradeRule',
      component: gradeRule
    }
  ]
})
