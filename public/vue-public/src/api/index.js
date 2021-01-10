import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource);

const API = "http://localhost:9100/api/";

const ProductListResource = Vue.resource(API + "products");

export default {
    fetchProductList: () => {
        return ProductListResource.get();
    },
    loginUser: (userData) => {
        return Vue.http.post(API + "users/login", userData);
    },
    fetchLoginUser: (token) => {
        return Vue.http.post(API + "users/checklogin", token);
    },
    logoutUser: () => {
        return Vue.http.get(API + "users/logout");
    },
    signUp: (userData) => {
        return Vue.http.post(API + "users", userData);
    },
    fetchCategoryList: () => {
        return Vue.http.get(API + "categories");
    },
    postProduct: (productData) => {
        return Vue.http.post(API + "products", productData);
    },
    getProductByUser: (token) => {
        return Vue.http.get(API + "products/" + token);
    }
};