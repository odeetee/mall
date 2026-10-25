import { createRouter, createWebHistory } from 'vue-router'
import CourseCard from '../views/CourseCard.vue'
import ProductList from '../views/ProductList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'course',
      component: CourseCard   // 保留：访问首页 / ，显示课程卡片
    },
    {
      path: '/list',
      name: 'productList',
      component: ProductList  // 新增：访问 /list，显示商品卡片
    }
  ]
})

export default router
