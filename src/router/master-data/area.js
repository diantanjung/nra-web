const IndexView = () => import("@/views/admin/Area/IndexView.vue");

const routes = [
  {
    path: "area",
    name: "master-area-index",
    component: IndexView,
  },
]

export default routes;