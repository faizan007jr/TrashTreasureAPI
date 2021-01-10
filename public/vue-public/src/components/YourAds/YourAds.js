import { mapActions, mapGetters } from "vuex";
import store from "../../vuex/store";
import ProductComponent from "../Product";

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