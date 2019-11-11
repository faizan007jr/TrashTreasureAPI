<template>
    <main class="container">
        <div v-if="loginStatus === 200">
            <h2>Fill the Form to Post an Ad</h2>
            <div class="form-group text-left mt-4 ml-2 mr-2">
                <validation-provider rules="required" v-slot="{ errors }" class="row form-group">
                    <label for="category" class="col-md-2">Category: </label>
                    <select id="category" v-model="selectedCat" class="col-md-4 form-control">
                        <option v-for="category in categoryList" :value="category._id" :key="category._id">{{category.category}}</option>
                    </select>
                    <span class="col-md-4 offset-md-1 text-danger">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required" v-slot="{ errors }" class="row form-group">
                    <label for="name" class="col-md-2">Name: </label>
                    <input type="text" id="name" class="col-md-4 form-control" v-model="name" placeholder="Enter Product Name" required>
                    <span class="col-md-4 offset-md-1 text-danger">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required" v-slot="{ errors }" class="row form-group">
                    <label for="description" class="col-md-2">Description: </label>
                    <textarea type="text" id="description" class="col-md-4 form-control" row="4" v-model="description" placeholder="Describe Your Product" required></textarea>
                    <span class="col-md-4 offset-md-1 text-danger">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider rules="required|min_value:1" v-slot="{ errors }" class="row form-group">
                    <label for="price" class="col-md-2">Price: </label>
                    <input type="number" id="price" class="col-md-4 form-control" v-model="price" placeholder="Enter Product Price" required>
                    <span class="col-md-4 offset-md-1 text-danger">{{ errors[0] }}{{ errors[1] }}</span>
                </validation-provider>

                <div class="row form-group text-danger" v-if="!isProductPosted">Error Posting Product</div>

                <div class="row form-group">
                    <button @click="onPost()" class="btn btn-block btn-primary col-md-4 offset-md-2">Post</button>
                </div>
            </div>
        </div>
        <div v-else>
            <h1>Please Login...</h1>
        </div>
    </main>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import store from "../vuex/store";
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
</script>

<style scoped>

</style>