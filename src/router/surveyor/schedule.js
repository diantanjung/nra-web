const IndexView = () => import("@/views/admin/Schedule/IndexView.vue");
const CreateView = () => import("@/views/admin/Schedule/CreateView.vue");
const EditView = () => import("@/views/admin/Schedule/EditView.vue");
const DetailView = () => import("@/views/admin/Schedule/DetailView.vue");

const routes = [
  {
    path: "schedule",
    name: "admin-schedule",
    component: IndexView,
  },
  {
    path: "schedule/create",
    name: "admin-schedule-create",
    component: CreateView,
  },
  {
    path: "schedule/detail/:id",
    name: "admin-schedule-detail",
    component: DetailView,
  },
  {
    path: "schedule/edit/:id",
    name: "admin-schedule-edit",
    component: EditView,
  }
]

export default routes;