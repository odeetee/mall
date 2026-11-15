import { createRouter, createWebHashHistory } from 'vue-router'
import CourseCard from '../views/CourseCard.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetailProps from '@/views/ProductDetailProps.vue'
import Cart from '../views/Cart.vue'
import NotFound from '@/views/NotFound.vue'
import ProductDetail from '@/views/ProductDetail.vue'

// === 案例3新增导入（这几个是现在要新建的页面）
import Login from '@/views/Login.vue'
import AdminLayout from '@/views/AdminLayout.vue'
import AdminProducts from '@/views/AdminProducts.vue'
import AdminOrders from '@/views/AdminOrders.vue'

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
     // ========== 新增：登录页 ==========
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true }
    },
     // ========== 新增：后台嵌套路由 ==========
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true }, // 父路由标记需要登录，子路由继承
      children: [
        { path: '', redirect: '/admin/products' },
        // 子路由path不要加 /
        { path: 'products', name: 'admin-products', component: AdminProducts },
        { path: 'orders', name: 'admin-orders', component: AdminOrders }
    ]
    },
     // 404兜底，放在最后
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
// ========== 全局前置守卫 ==========
router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  // 登录页guest直接放行，防止死循环
  if (to.meta.guest) return true

  // 需要登录并且没有token → 跳登录，带上from
  if (to.meta.requiresAuth && !token) {
    return { path: '/login', query: { from: to.fullPath } }
  }

  // 其余全部放行
  return true
})

export default router