<template>
  <section>
    <nav class="navbar navbar-expand-sm fixed-top navbar-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand font-italic">Trash&Treasure</router-link>
        <button class="navbar-toggler"
                type="button" data-toggle="collapse"
                data-target="#navbar" aria-controls="navbar"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
            <li class="nav-item"><router-link to="/products" class="nav-link">Products</router-link> </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="addDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                User
              </a>
              <div class="dropdown-menu" aria-labelledby="addDropdown">
                <router-link class="dropdown-item" to="/post">Post ad</router-link>
                <div class="dropdown-divider" v-if="loginStatus === 200"></div>
                <router-link class="dropdown-item" v-if="loginStatus === 200" to="/your-ads">Your ads</router-link>
                <div class="dropdown-divider"></div>
                <span v-if="loginStatus !== 200">
                  <router-link class="dropdown-item" to="/login">Login</router-link>
                </span>
                <span v-else>
                  <span class="dropdown-item text-danger" id="logout" @click="onLogout()">Logout</span>
                </span>
              </div>
            </li>
            <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view class="main"/>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import store from "./vuex/store";
  import router from "./router";

  export default {
    computed: mapGetters({
      loginStatus: 'getLoginStatus',
      token: 'getToken'
    }),
    store,
    methods: {
      ...mapActions(['loggedInUser', 'logoutUser']),
      onLogout() {
        this.logoutUser();
        router.push("/");
      }
    }
  }
</script>

<style>

.form-control:focus {
  border-color: #6d3353;
  box-shadow: 0 0 0 0.2rem rgba(109, 51, 83, 0.25);
}

body {
  color: #FFFFFF;
  background-image: url("./assets/back.jpg");
}

.main {
  margin-top: 4em;
}

  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  background-color: #020031;

}

.navbar-dark .navbar-brand{
  font-family: CentSchbook Mono BT, Bitstream Vera Sans Mono, monofont, monospace;
  font-size: x-large;
  border: 40px;
  background-color: saddlebrown;
  border-radius: 20px;
}

.btn {
  background-color: #020031;
  color: #FFFFFF;
}

.btn:focus {
  border-color: #020031;
  box-shadow: 0 0 0 0.2rem rgba(2, 0, 49, 0.25);
}

.toast-box {
  padding: 12px 25px;
  margin: 20px;
}

.toast-success {
  background-color: forestgreen;
}

.toast-error {
  background-color: red;
}
</style>
