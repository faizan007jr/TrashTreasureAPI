<template>
    <main class="album py-5 bg-light text-left">
        <div class="container">
            <div class="row">
                <product-component v-for="product in productList" :product="product" :editable="true" :key="product._id"></product-component>
            </div>
        </div>
    </main>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import store from "../vuex/store";
    import ProductComponent from "./ProductComponent";

    export default {
        name: "YourAdsComponent",
        components: {
            ProductComponent
        },
        methods: mapActions(['fetchProductsByUser']),
        computed: mapGetters({
            productList: 'getProductsByUser',
            token: 'getToken'
        }),
        store,
        mounted() {
            this.fetchProductsByUser(this.token);
        }
    }
</script>

<style scoped>

</style>