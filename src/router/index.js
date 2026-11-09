import { createRouter, createWebHashHistory } from 'vue-router'
import CourseCard from '../views/CourseCard.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetailProps from '@/views/ProductDetailProps.vue'
import Cart from '../views/Cart.vue'
import NotFound from '@/views/NotFound.vue'
import ProductDetail from '@/views/ProductDetail.vue'

if (!location.hash && location.pathname !== '/' 
&& !/\.html?$/.test(location.pathname)) { 
 history.replaceState(null, '', '/#' + location.pathname) 
} 

// 单独定义路由数组，名字 routes
const routes = [
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
    //useRoute：耦合路由，组件脱离路由就不能单独用
    {
      path: '/products/:id',
      name: 'detail',
      component: ProductDetail,
      props: true
    },
    //props:true：解耦，组件只接收id，不知道路由的存在，复用性更好
    {
      path: '/props/:id',
      name: 'detail-props',
      component: ProductDetailProps,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
// 实例叫 router，里面的参数 routes 引用上面数组
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router