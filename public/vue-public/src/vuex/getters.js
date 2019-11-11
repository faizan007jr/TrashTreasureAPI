export default {
    getProductList: state => state.productlist,
    getLoginStatus: state => state.loginStatus,
    getSignUpStatus: state => state.signUpStatus,
    getToken: state => state.token,
    getCategories: status => status.categories,
    getIsProductPosted: status => status.isProductPosted,
    getProductsByUser: status => status.productsByUser,
}