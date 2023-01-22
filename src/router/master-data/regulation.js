const IndexView = () => import("@/views/admin/Regulation/IndexView.vue");

const routes = [
  {
    path: "regulation",
    name: "master-regulation-index",
    component: IndexView,
  },
]

export default routes;