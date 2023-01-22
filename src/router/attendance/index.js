
// * REPORT
const IndexView = () => import("@/views/admin/Attendance/IndexView.vue");

const routes = [
  {
    path: "attendance",
    name: "admin-attendance",
    component: IndexView,
  }
]

export default routes;