<template>

    <main class="">
        <div class="container-login100">
            <div class="wrap-login100">
                <div class="login100-form-title" :style="{'background-image': `url(${require('../assets/bg-01.jpg')})`}">
                    <span class="login100-form-title-1">
                    Sign In
                    </span>
                </div>
                <div class="login100-form">
                    <div class="wrap-input100">
                        <span class="label-input100">Username</span>
                        <input class="input100 form-control" type="text" name="username" v-model="username" placeholder="Enter username" required>
                    </div>
                    <div class="wrap-input100 mt-2">
                        <span class="label-input100">Password</span>
                        <input class="input100 form-control" type="password" name="pass" v-model="password" placeholder="Enter password" required>
                        <span class="focus-input100"></span>
                    </div>
                    <div class="flex-sb-m w-full p-b-30">
                        <div>
                            <span @click="onSignUp()" class="txt1">
                                Not already a user? Register Here
                            </span>
                        </div>
                    </div>
                    <div class="mt-3 offset-1 col-10">
                        <button @click="onLogin()" class="btn btn-success rounded-pill btn-block btn-lg">Login</button>
                    </div>
                    <div v-if="loginStatus === 404" class="col-12 text-danger">
                        Invalid username or password!
                    </div>
                    <div v-else-if="loginStatus === 200" class="col-12 text-success">
                        Login Successful
                    </div>
                </div>
            </div>
        </div>
    </main>

</template>

<script>
    import router from "../router";
    import {mapActions, mapGetters} from "vuex";
    import store from "../vuex/store";

    export default {
        name: "LoginComponent",
        data() {
            return {
                username: "",
                password: ""
            }
        },
        store,
        computed: mapGetters({
            loginStatus: 'getLoginStatus'
        }),
        methods: {
            ...mapActions(['loginUser']),
            onSignUp() {
                router.push("signup");
            },
            onLogin() {
                let userData = {
                    username: this.username,
                    pwd: this.password
                };
                this.loginUser(userData);
            }
        }
    }
</script>

<style scoped>

    .txt1 {
        font-family: Poppins-Regular;
        font-size: 13px;
        line-height: 1.4;
        color: #999999;
    }

    .txt1:hover {
        cursor: pointer;
    }

    .container-login100 {
        width: 100%;
        min-height: 88.5vh;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 15px;
        background: #ebeeef;
    }

    .wrap-login100 {
        width: 670px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
    }

    .login100-form-title {
        width: 100%;
        position: relative;
        z-index: 1;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;

        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        padding: 70px 15px 74px 15px;
    }

    .login100-form-title-1 {
        font-family: Poppins-Bold;
        font-size: 30px;
        color: #fff;
        text-transform: uppercase;
        line-height: 1.2;
        text-align: center;
    }

    .login100-form-title::before {
        content: "";
        display: block;
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(54,84,99,0.7);
    }

    .login100-form {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 43px 88px 93px 190px;
    }

    .wrap-input100 {
        width: 100%;
        position: relative;
    }

    .label-input100 {
        font-family: Poppins-Regular;
        font-size: 15px;
        color: #808080;
        line-height: 1.2;
        text-align: right;

        position: absolute;
        top: 14px;
        left: -105px;
        width: 80px;

    }

    /*---------------------------------------------*/
    .input100 {
        font-family: Poppins-Regular;
        font-size: 15px;
        color: #555555;
        line-height: 1.2;

        display: block;
        width: 100%;
        background: transparent;
        padding: 0 5px;
    }

    .focus-input100 {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
    }

    .focus-input100::before {
        content: "";
        display: block;
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 0;
        height: 1px;

        -webkit-transition: all 0.6s;
        -o-transition: all 0.6s;
        -moz-transition: all 0.6s;
        transition: all 0.6s;

        background: #57b846;
    }


    /*---------------------------------------------*/
    input.input100 {
        height: 45px;
    }


    .input100:focus + .focus-input100::before {
        width: 100%;
    }

    .has-val.input100 + .focus-input100::before {
        width: 100%;
    }

    .input-checkbox100:checked + .label-checkbox100::before {
        color: #57b846;
    }

    /*------------------------------------------------------------------
    [ Responsive ]*/

    @media (max-width: 576px) {
        .login100-form {
            padding: 43px 15px 57px 117px;
        }
    }

    @media (max-width: 480px) {
        .login100-form {
            padding: 43px 15px 57px 15px;
        }

        .label-input100 {
            text-align: left;
            position: unset;
            top: unset;
            left: unset;
            width: 100%;
            padding: 0 5px;
        }
    }

</style>