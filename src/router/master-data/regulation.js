const IndexView = () => import("@/views/admin/Regulation/IndexView.vue");
const CreateView = () => import("@/views/admin/Regulation/CreateView.vue");
const EditView = () => import("@/views/admin/Regulation/EditView.vue");
const DetailView = () => import("@/views/admin/Regulation/DetailView.vue");

const routes = [
  {
    path: "regulation",
    name: "master-regulation-index",
    component: IndexView,
  },
  {
    path: "regulation/create",
    name: "master-regulation-create",
    component: CreateView,
  },
  {
    path: "regulation/detail/:id",
    name: "master-regulation-detail",
    component: DetailView,
  },
  {
    path: "regulation/edit/:id",
    name: "master-regulation-edit",
    component: EditView,
  }
]

export default routes;