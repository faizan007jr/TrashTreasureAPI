<template>
    <li class="list-group-item">
        {{product.name}}
    </li>
</template>

<script>
    export default {
        name: "ProductComponent",
        props: ['product']
    }
</script>

<style scoped>

</style>