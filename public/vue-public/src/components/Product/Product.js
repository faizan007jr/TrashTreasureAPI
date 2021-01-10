import router from "../../router";

export default {
  name: "ProductComponent",
  props: ['product', 'editable'],
  methods: {
    onEdit() {
      router.push('/your-ads/' + this.product._id);
    },
    onView() {
      console.log(JSON.parse(JSON.stringify(this.product)));
    }
  }
}