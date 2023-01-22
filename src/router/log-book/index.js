
// * REPORT
const IndexView = () => import("@/views/admin/LogBook/IndexView.vue");

const routes = [
  {
    path: "log-book",
    name: "admin-log-book",
    component: IndexView,
  }
]

export default routes;