const IndexView = () => import("@/views/admin/ActivityLog/IndexView.vue");

const routes = [
  {
    path: "activity-log",
    name: "master-activity-log-index",
    component: IndexView,
  },
]

export default routes;