import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource);

const API = "http://localhost:3000/api/";

const ProductListResource = Vue.resource(API + "products");

//const UserLogin = Vue.resource(API + "users/login");

export default {
    fetchProductList: () => {
        return ProductListResource.get();
    },
    loginUser: (userData) => {
        return Vue.http.post(API + "users/login", userData);
    }
};