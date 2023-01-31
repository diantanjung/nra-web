
// * REPORT
const IndexView = () => import("@/views/admin/Store/IndexView.vue");
const DetailView = () => import("@/views/admin/Store/DetailView.vue");


const routes = [
  {
    path: "store",
    name: "admin-store",
    component: IndexView,
  },
  {
    path: "store/:id",
    name: "admin-store-detail",
    component: DetailView,
  },
]

export default routes;