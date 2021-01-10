import Datepicker from 'vuejs-datepicker';
import store from "../../vuex/store";
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
      if (!this.error) {
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
            if (this.signUpStatus == 201) {
              this.signUpError = "";
            } else if (this.signUpStatus == 409) {
              this.signUpError = "Duplicate Username or Email";
            } else {
              this.signUpError = "Sign up fail";
            }
          });
      }
    },
    onComPass() {
      if (this.password && this.cpassword) {
        if (this.password !== this.cpassword) {
          this.error = "Confirm password must be same!";
        } else {
          this.error = "";
        }
      }
    }
  }
}