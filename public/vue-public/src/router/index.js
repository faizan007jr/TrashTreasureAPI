import Vue from 'vue';
import VueRouter from 'vue-router';
import CxltToastr from 'cxlt-vue2-toastr';
import BootstrapVue from 'bootstrap-vue';

import { Toast } from "../config";

import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import HomeComponent from "../components/Home";
import ProductListComponent from "../components/ProductList";
import LoginComponent from "../components/Login";
import SignUpComponent from "../components/SignUp";
import PostComponent from "../components/Post";
import YourAdsComponent from "../components/YourAds";

Vue.use(CxltToastr, Toast);
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
		path: '/signup',
		name: 'signup',
		component: SignUpComponent
	},
	{
		path: '/post',
		name: 'post',
		component: PostComponent
	},
	{
		path: '/your-ads',
		name: 'your-ads',
		component: YourAdsComponent
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;