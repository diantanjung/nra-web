const IndexView = () => import("@/views/admin/Approval/IndexView.vue");
const DetailView = () => import("@/views/admin/Approval/DetailView.vue");

const routes = [
  {
    path: "approval",
    name: "admin-approval",
    component: IndexView,
  },
  {
    path: "approval/detail/:id",
    name: "admin-approval-detail",
    component: DetailView,
  },
]

export default routes;