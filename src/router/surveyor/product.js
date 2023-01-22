
// * REPORT
const IndexView = () => import("@/views/admin/Product/IndexView.vue");

const routes = [
  {
    path: "product",
    name: "admin-product",
    component: IndexView,
  }
]

export default routes;