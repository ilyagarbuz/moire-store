import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import CartPage from '@/views/CartPage.vue'
import OrderPage from '@/views/OrderPage.vue'
import OrderInfoPage from '@/views/OrderInfoPage.vue'

const routes = [
  { path: '/', name: 'main', component: MainPage },
  { path: '/:id', name: 'main-category', component: MainPage },
  { path: '/product/:id', name: 'product', component: ProductPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/order', name: 'order', component: OrderPage },
  { path: '/order-info/:id', name: 'order-info', component: OrderInfoPage },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === 'production'
      ? '/moire-store/'
      : '/'
  ),
  routes
})

export default router
