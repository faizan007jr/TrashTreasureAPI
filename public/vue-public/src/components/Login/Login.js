import router from "../../router";
import { mapActions, mapGetters } from "vuex";
import store from "../../vuex/store";

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

			this.loginUser(userData).then(() => {
                console.log(2);
				if(this.loginStatus === 404) {
					this.$toast.error({
						title:'Login Error',
						message:'Invalid username or password!'
					});
				} else {
					this.$toast.success({
						title:'Login Success',
						message:'Welcome!'
					});
					router.push("/");
				}
			});
		}
	}
}