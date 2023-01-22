const IndexView = () => import("@/views/admin/ProductCategory/IndexView.vue");

const routes = [
  {
    path: "product-category",
    name: "master-product-category-index",
    component: IndexView,
  },
]

export default routes;