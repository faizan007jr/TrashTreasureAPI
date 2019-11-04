import * as types from './mutation_types';

export default {
    [types.POPULATE_PRODUCT_LIST] (state, list) {
        state.productlist = list;
    },
    [types.LOGIN_STATUS] (state, loginStatus) {
        state.loginStatus = loginStatus;
    }
};