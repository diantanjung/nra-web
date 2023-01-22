const IndexView = () => import("@/views/admin/Client/IndexView.vue");

const routes = [
  {
    path: "client",
    name: "master-client-index",
    component: IndexView,
  },
]

export default routes;