const IndexView = () => import("@/views/admin/Client/IndexView.vue");
const CreateView = () => import("@/views/admin/Client/CreateView.vue");
const EditView = () => import("@/views/admin/Client/EditView.vue");
const DetailView = () => import("@/views/admin/Client/DetailView.vue");

const routes = [
  {
    path: "client",
    name: "master-client-index",
    component: IndexView,
  },
  {
    path: "client/create",
    name: "master-client-create",
    component: CreateView,
  },
  {
    path: "client/detail/:id",
    name: "master-client-detail",
    component: DetailView,
  },
  {
    path: "client/edit/:id",
    name: "master-client-edit",
    component: EditView,
  }
]

export default routes;