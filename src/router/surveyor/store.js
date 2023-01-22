
// * REPORT
const IndexView = () => import("@/views/admin/Store/IndexView.vue");

const routes = [
  {
    path: "store",
    name: "admin-store",
    component: IndexView,
  }
]

export default routes;