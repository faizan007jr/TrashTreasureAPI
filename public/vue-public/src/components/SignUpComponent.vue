<template>
    <main>
        <div class="container-signup100">
            <div class="wrap-signup100">
                <div class="signup100-form-title" :style="{'background-image': `url(${require('../assets/bg-01.jpg')})`}">
                    <span class="signup100-form-title-1">
                        Registration
                    </span>
                </div>
                <div class="signup100-form">
                    <div class="wrap-input100">
                        <label class="label-input100">Email</label>
                        <validation-provider rules="required|email" v-slot="{ errors }">
                            <input class="input100 form-control" type="text" name="email" v-model="email" placeholder="Enter Email" required>
                            <span class="focus-input100">{{ errors[0] }}{{ errors[1] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">First Name</label>
                            <input class="input100 form-control" type="text" name="firstname" v-model="firstname" placeholder="Enter First Name" required>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">Last Name</label>
                            <input class="input100 form-control" type="text" name="lastname" v-model="lastname" placeholder="Enter Last Name" required>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">Birth Date</label>
                            <Datepicker class="input100" bootstrap-styling v-model="dob" placeholder="Enter Birth Date"></Datepicker>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">Username</label>
                            <input class="input100 form-control" type="text" name="username" v-model="username" placeholder="Enter Username" required>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">Password</label>
                            <input class="input100 form-control" @keyup="onComPass" type="password" name="pass" v-model="password" placeholder="Enter Password" required>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">Confirm Password</label>
                            <input class="input100 form-control" @keyup="onComPass" type="password" name="cpass" v-model="cpassword" placeholder="Enter Confirm Password" required>
                            <span class="focus-input100">{{ error }}{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <h3 class="mt-3 text-success">Address</h3>

                    <div class="wrap-input100 mt-1">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">Line 1</label>
                            <input class="input100 form-control" type="text" name="line1" v-model="line1" placeholder="Enter Line1" required>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <label class="label-input100">Line 2</label>
                        <input class="input100 form-control" type="text" name="line2" v-model="line2" placeholder="Enter Line2" required>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">Street</label>
                            <input class="input100 form-control" type="text" name="street" v-model="street" placeholder="Enter Street" required>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">City</label>
                            <input class="input100 form-control" type="text" name="city" v-model="city" placeholder="Enter City" required>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">State</label>
                            <input class="input100 form-control" type="text" name="state" v-model="ustate" placeholder="Enter State" required>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">Country</label>
                            <input class="input100 form-control" type="text" name="country" v-model="country" placeholder="Enter Country" required>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2">
                        <validation-provider rules="required" v-slot="{ errors }">
                            <label class="label-input100">Postal Code</label>
                            <input class="input100 form-control" type="text" name="postalcode" v-model="postalcode" placeholder="Enter Postal Code" required>
                            <span class="focus-input100">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>

                    <div class="wrap-input100 mt-2 text-danger">
                        <span>{{ signUpError }}</span>
                    </div>

                    <div class="mt-3 offset-1 col-10">
                        <button @click="onSignUp()" class="btn btn-success rounded-pill btn-block btn-lg">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import store from "../vuex/store";
    import { mapActions, mapGetters } from "vuex";
    import { ValidationProvider, extend } from "vee-validate";
    import { required, email } from 'vee-validate/dist/rules';

    extend('required', {
        ...required,
        message: '*Required'
    });

    extend('email', {
        ...email,
        message: 'Must an Email'
    });

    export default {
        name: "SignUpComponent",
        components: {
            Datepicker,
            ValidationProvider
        },
        data() {
            return {
                username: "",
                password: "",
                cpassword: "",
                email: "",
                firstname: "",
                lastname: "",
                dob: "",
                line1: "",
                line2: "",
                street: "",
                city: "",
                ustate: "",
                country: "",
                postalcode: "",
                profileImage: "member.png",
                error: "",
                signUpError: ""
            }
        },
        store,
        computed: mapGetters({
            signUpStatus: 'getSignUpStatus'
        }),
        methods: {
            ...mapActions(['signUpUser', 'loginUser']),
            onSignUp() {
                //TODO: Validate
                if(!this.error) {
                    let userData = {
                        email: this.email,
                        firstName: this.firstname,
                        lastName: this.lastname,
                        dob: this.dob,
                        username: this.username,
                        pwd: this.password,
                        address: {
                            line1: this.line1,
                            line2: this.line2,
                            street: this.street,
                            city: this.city,
                            state: this.ustate,
                            country: this.country,
                            postalCode: this.postalcode
                        },
                        profileImage: this.profileImage
                    };

                    this.signUpUser(userData)
                        .then(() => {
                            if(this.signUpStatus == 201) {
                                this.signUpError = "";
                            } else if(this.signUpStatus == 409) {
                                this.signUpError = "Duplicate Username or Email";
                            } else {
                                this.signUpError = "Sign up fail";
                            }
                        });
                }
            },
            onComPass() {
                if(this.password && this.cpassword) {
                    if (this.password !== this.cpassword) {
                        this.error = "Confirm password must be same!";
                    } else {
                        this.error = "";
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .container-signup100 {
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
    }

    .wrap-signup100 {
        width: 670px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
    }

    .signup100-form-title {
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

    .signup100-form-title-1 {
        font-family: Poppins-Bold;
        font-size: 30px;
        color: #fff;
        text-transform: uppercase;
        line-height: 1.2;
        text-align: center;
    }

    .signup100-form-title::before {
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

    .signup100-form {
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
        color: crimson;
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 12px;
        left: 50px;
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

    input.input100 {
        height: 45px;
    }

    .has-val.input100 + .focus-input100::before {
        width: 100%;
    }

    .input-checkbox100:checked + .label-checkbox100::before {
        color: #57b846;
    }

    @media (max-width: 576px) {
        .signup100-form {
            padding: 43px 15px 57px 117px;
        }
    }

    @media (max-width: 480px) {
        .signup100-form {
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