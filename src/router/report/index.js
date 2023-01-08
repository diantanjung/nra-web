
// * REPORT
const ReportIndex = () => import("@/views/admin/Report/IndexView.vue");

const routes = [
  {
    path: "report",
    name: "admin-report",
    component: ReportIndex,
  }
]

export default routes;