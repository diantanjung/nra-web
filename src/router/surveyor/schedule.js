
// * REPORT
const IndexView = () => import("@/views/admin/Schedule/IndexView.vue");

const routes = [
  {
    path: "schedule",
    name: "admin-schedule",
    component: IndexView,
  }
]

export default routes;