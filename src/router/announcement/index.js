
// * REPORT
const IndexView = () => import("@/views/admin/Announcement/IndexView.vue");

const routes = [
  {
    path: "announcement",
    name: "admin-announcement",
    component: IndexView,
  }
]

export default routes;