const IndexView = () => import("@/views/admin/Client/IndexView.vue");
const DetailView = () => import("@/views/admin/Client/DetailView.vue");


const routes = [
  {
    path: "client",
    name: "master-client-index",
    component: IndexView,
  },
  {
    path: "client/:id",
    name: "master-client-detail",
    component: DetailView,
  },
]

export default routes;