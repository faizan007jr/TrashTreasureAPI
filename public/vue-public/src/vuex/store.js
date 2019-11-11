import Vue from 'vue';
import Vuex from 'vuex';
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {
    productlist: [],
    loginStatus: '',
    token: '',
    signUpStatus: '',
    categories: [],
    isProductPosted: true,
    productsByUser: []
};

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state,
    mutations,
    getters,
    actions
});