const IndexView = () => import("@/views/admin/User/IndexView.vue");
const CreateView = () => import("@/views/admin/User/CreateView.vue");
const EditView = () => import("@/views/admin/User/EditView.vue");
const DetailView = () => import("@/views/admin/User/DetailView.vue");

const routes = [
  {
    path: "user",
    name: "master-user-index",
    component: IndexView,
  },
  {
    path: "user/create",
    name: "master-user-create",
    component: CreateView,
  },
  {
    path: "user/detail/:id",
    name: "master-user-detail",
    component: DetailView,
  },
  {
    path: "user/edit/:id",
    name: "master-user-edit",
    component: EditView,
  }
]

export default routes;