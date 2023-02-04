const IndexView = () => import("@/views/admin/Area/IndexView.vue");
const CreateView = () => import("@/views/admin/Area/CreateView.vue");
const EditView = () => import("@/views/admin/Area/EditView.vue");
const DetailView = () => import("@/views/admin/Area/DetailView.vue");

const routes = [
  {
    path: "area",
    name: "master-area-index",
    component: IndexView,
  },
  {
    path: "area/create",
    name: "master-area-create",
    component: CreateView,
  },
  {
    path: "area/detail/:id",
    name: "master-area-detail",
    component: DetailView,
  },
  {
    path: "area/edit/:id",
    name: "master-area-edit",
    component: EditView,
  }
]

export default routes;