import { createRouter, createWebHashHistory } from 'vue-router'
import CourseCard from '../views/CourseCard.vue'
import ProductList from '../views/ProductList.vue'
import Cart from '../views/Cart.vue'
import NotFound from '@/views/NotFound.vue'
import ProductDetail from '@/views/ProductDetail.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'course',
      component: CourseCard
    },
    {
      path: '/list',
      name: 'productList',
      component: ProductList
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
       // 新增详情页与404页面路由！
    {
      path: '/detail',
      name: 'detail',
      component: ProductDetail
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router