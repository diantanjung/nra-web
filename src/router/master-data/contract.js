const IndexView = () => import("@/views/admin/Contract/IndexView.vue");

const routes = [
  {
    path: "contract",
    name: "master-contract-index",
    component: IndexView,
  },
]

export default routes;