import {mapActions, mapGetters} from "vuex";
import store from "../../vuex/store";
import { ValidationProvider, extend } from "vee-validate";
import { required, min_value } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: '*Required'
});

extend('min_value', {
    ...min_value,
    message: '*Must be greater than 0'
})

export default {
    name: "PostComponent",
    components: {
        ValidationProvider
    },
    methods: {
        ...mapActions(['fetchCategories', 'postProduct']),
        onPost() {
            let productData = {
                category: this.selectedCat,
                name: this.name,
                description: this.description,
                price: this.price,
                token: this.token
            };

            this.postProduct(productData);
        }
    },
    computed: mapGetters({
        loginStatus: 'getLoginStatus',
        categoryList: 'getCategories',
        token: 'getToken',
        isProductPosted: 'getIsProductPosted'
    }),
    data() {
        return {
            selectedCat: '',
            name: '',
            description: '',
            price: 0
        }
    },
    store,
    mounted() {
        this.fetchCategories();
    }
}