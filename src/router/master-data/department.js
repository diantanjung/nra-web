const IndexView = () => import("@/views/admin/Department/IndexView.vue");

const routes = [
  {
    path: "department",
    name: "master-department-index",
    component: IndexView,
  },
]

export default routes;