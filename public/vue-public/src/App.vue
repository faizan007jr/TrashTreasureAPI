<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/products">Products</router-link> |
      <span v-if="loginStatus === 404">
        <router-link to="/login">Login</router-link> |
      </span>
      <span v-else-if="loginStatus === 200" class="font-weight-bold" id="logout" @click="onLogout()">Logout</span>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import store from "./vuex/store";

  export default {
    computed: mapGetters({
      loginStatus: 'getLoginStatus'
    }),
    store,
    methods: {
      onLogout() {
        //TODO
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

  #logout:hover {
    cursor: pointer;
    color: crimson;
  }
</style>
