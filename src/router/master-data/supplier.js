const IndexView = () => import("@/views/admin/Supplier/IndexView.vue");

const routes = [
  {
    path: "supplier",
    name: "master-supplier-index",
    component: IndexView,
  },
]

export default routes;