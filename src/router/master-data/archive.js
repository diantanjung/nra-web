const IndexView = () => import("@/views/admin/Archive/IndexView.vue");

const routes = [
  {
    path: "archive",
    name: "master-archive-index",
    component: IndexView,
  },
]

export default routes;