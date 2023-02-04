const IndexView = () => import("@/views/admin/Archive/IndexView.vue");
const CreateView = () => import("@/views/admin/Archive/CreateView.vue");
const EditView = () => import("@/views/admin/Archive/EditView.vue");
const DetailView = () => import("@/views/admin/Archive/DetailView.vue");

const routes = [
  {
    path: "archive",
    name: "master-archive-index",
    component: IndexView,
  },
  {
    path: "archive/create",
    name: "master-archive-create",
    component: CreateView,
  },
  {
    path: "archive/detail/:id",
    name: "master-archive-detail",
    component: DetailView,
  },
  {
    path: "archive/edit/:id",
    name: "master-archive-edit",
    component: EditView,
  }
]

export default routes;