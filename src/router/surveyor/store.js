const IndexView = () => import("@/views/admin/Store/IndexView.vue");
const CreateView = () => import("@/views/admin/Store/CreateView.vue");
const EditView = () => import("@/views/admin/Store/EditView.vue");
const DetailView = () => import("@/views/admin/Store/DetailView.vue");

const routes = [
  {
    path: "store",
    name: "admin-store",
    component: IndexView,
  },
  {
    path: "store/create",
    name: "admin-store-create",
    component: CreateView,
  },
  {
    path: "store/detail/:id",
    name: "admin-store-detail",
    component: DetailView,
  },
  {
    path: "store/edit/:id",
    name: "admin-store-edit",
    component: EditView,
  }
]

export default routes;