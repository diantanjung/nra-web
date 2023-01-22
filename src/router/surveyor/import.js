
// * REPORT
const IndexView = () => import("@/views/admin/Import/IndexView.vue");

const routes = [
  {
    path: "import",
    name: "admin-import",
    component: IndexView,
  }
]

export default routes;