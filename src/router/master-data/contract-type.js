const IndexView = () => import("@/views/admin/ContractType/IndexView.vue");

const routes = [
  {
    path: "contract-type",
    name: "master-contract-type-index",
    component: IndexView,
  },
]

export default routes;