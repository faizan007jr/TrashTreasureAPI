import Vue from 'vue';
import Vuex from 'vuex';
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

Vue.use(Vuex);

const state = {
    productlist: [],
    loginStatus: ''
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});