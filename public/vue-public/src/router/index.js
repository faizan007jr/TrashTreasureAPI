import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from "../components/HomeComponent";
import ProductListComponent from "../components/ProductListComponent";
import LoginComponent from "../components/LoginComponent";

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import SignUpComponent from "../components/SignUpComponent";

Vue.use(BootstrapVue);

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/products',
    name: 'products',
    component: ProductListComponent
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    name: 'signup',
    component: SignUpComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
