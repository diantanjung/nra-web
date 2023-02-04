const IndexView = () => import("@/views/admin/Product/IndexView.vue");
const CreateView = () => import("@/views/admin/Product/CreateView.vue");
const EditView = () => import("@/views/admin/Product/EditView.vue");
const DetailView = () => import("@/views/admin/Product/DetailView.vue");

const routes = [
  {
    path: "product",
    name: "admin-product",
    component: IndexView,
  },
  {
    path: "product/create",
    name: "admin-product-create",
    component: CreateView,
  },
  {
    path: "product/detail/:id",
    name: "admin-product-detail",
    component: DetailView,
  },
  {
    path: "product/edit/:id",
    name: "admin-product-edit",
    component: EditView,
  }
]

export default routes;