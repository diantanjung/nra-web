const IndexView = () => import("@/views/admin/ProductCategory/IndexView.vue");
const CreateView = () => import("@/views/admin/ProductCategory/CreateView.vue");
const EditView = () => import("@/views/admin/ProductCategory/EditView.vue");
const DetailView = () => import("@/views/admin/ProductCategory/DetailView.vue");

const routes = [
  {
    path: "product-category",
    name: "master-product-category-index",
    component: IndexView,
  },
  {
    path: "product-category/create",
    name: "master-product-category-create",
    component: CreateView,
  },
  {
    path: "product-category/detail/:id",
    name: "master-product-category-detail",
    component: DetailView,
  },
  {
    path: "product-category/edit/:id",
    name: "master-product-category-edit",
    component: EditView,
  }
]

export default routes;