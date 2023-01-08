const UserIndex = () => import("@/views/admin/User/IndexView.vue");
const UserCreate = () => import("@/views/admin/User/CreateView.vue");
const UserEdit = () => import("@/views/admin/User/EditView.vue");
const UserDetail = () => import("@/views/admin/User/DetailView.vue");

const routes = [
  {
    path: "user",
    name: "master-user-index",
    component: UserIndex,
  },
  {
    path: "user/create",
    name: "master-user-create",
    component: UserCreate,
  },
  {
    path: "user/detail/:id",
    name: "master-user-detail",
    component: UserDetail,
  },
  {
    path: "user/edit/:id",
    name: "master-user-edit",
    component: UserEdit,
  }
]

export default routes;