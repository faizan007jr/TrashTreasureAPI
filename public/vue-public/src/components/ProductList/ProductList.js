import { mapActions, mapGetters } from "vuex";
import ProductComponent from "../Product";
import store from "../../vuex/store";

export default {
  name: "ProductListComponent",
  components: {
    ProductComponent
  },
  methods: mapActions(['populateProductList']),
  computed: mapGetters({
    productList: 'getProductList'
  }),
  store,
  mounted() {
    this.populateProductList();
  }
}