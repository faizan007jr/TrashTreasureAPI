<template>
    <div>
        <ul class="list-group">
            <product-component v-for="product in productList" :product="product" :key="product._id"></product-component>
        </ul>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import ProductComponent from "./ProductComponent";
    import store from "../vuex/store";

    export default {
        components: {
            ProductComponent
        },
        methods: mapActions(['populateProductList']),
        computed: mapGetters({
            productList: 'getProductList'
        }),
        store,
        mounted() {
            this.populateProductList()
        }
    }
</script>

<style scoped>

</style>