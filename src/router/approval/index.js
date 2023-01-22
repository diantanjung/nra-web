
// * REPORT
const IndexView = () => import("@/views/admin/Approval/IndexView.vue");

const routes = [
  {
    path: "approval",
    name: "admin-approval",
    component: IndexView,
  }
]

export default routes;