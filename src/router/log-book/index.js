const IndexView = () => import("@/views/admin/LogBook/IndexView.vue");
const DetailView = () => import("@/views/admin/LogBook/DetailView.vue");

const routes = [
  {
    path: "log-book",
    name: "admin-log-book",
    component: IndexView,
  },
  {
    path: "log-book/detail/:id",
    name: "admin-log-book-detail",
    component: DetailView,
  },
]

export default routes;