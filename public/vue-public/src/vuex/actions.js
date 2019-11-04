import {POPULATE_PRODUCT_LIST, LOGIN_STATUS} from "./mutation_types";
import api from '../api';
import router from "../router";

export default {
    populateProductList: ({ commit }) => {
        api.fetchProductList()
            .then(response => {
                commit(POPULATE_PRODUCT_LIST, response.data);
            });
    },
    loginUser: ({ commit }, userData) => {
        api.loginUser(userData)
            .then(res => {
                commit(LOGIN_STATUS, res.status);
                router.push("home");
            })
            .catch(() => {
                commit(LOGIN_STATUS, 404);
            });
    }
};