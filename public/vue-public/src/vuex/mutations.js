import * as types from './mutation_types';

export default {
    [types.POPULATE_PRODUCT_LIST] (state, list) {
        state.productlist = list;
    },
    [types.LOGIN_STATUS] (state, loginStatus) {
        state.loginStatus = loginStatus;
    },
    [types.SIGNUP_STATUS] (state, signUpState) {
        state.signUpStatus = signUpState;
    },
    [types.TOKEN] (state, token) {
        state.token = token
    },
    [types.CATEGORIES] (state, categories) {
        state.categories = categories;
    },
    [types.IS_PRODUCT_POSTED] (state, isProductPosted) {
        state.isProductPosted = isProductPosted;
    },
    [types.PRODUCTS_BY_USER] (state, productsByUser) {
        state.productsByUser = productsByUser;
    }
};