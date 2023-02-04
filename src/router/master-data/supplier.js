const IndexView = () => import("@/views/admin/Supplier/IndexView.vue");
const CreateView = () => import("@/views/admin/Supplier/CreateView.vue");
const EditView = () => import("@/views/admin/Supplier/EditView.vue");
const DetailView = () => import("@/views/admin/Supplier/DetailView.vue");

const routes = [
  {
    path: "supplier",
    name: "master-supplier-index",
    component: IndexView,
  },
  {
    path: "supplier/create",
    name: "master-supplier-create",
    component: CreateView,
  },
  {
    path: "supplier/detail/:id",
    name: "master-supplier-detail",
    component: DetailView,
  },
  {
    path: "supplier/edit/:id",
    name: "master-supplier-edit",
    component: EditView,
  }
]

export default routes;