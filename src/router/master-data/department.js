const IndexView = () => import("@/views/admin/Department/IndexView.vue");
const CreateView = () => import("@/views/admin/Department/CreateView.vue");
const EditView = () => import("@/views/admin/Department/EditView.vue");
const DetailView = () => import("@/views/admin/Department/DetailView.vue");

const routes = [
  {
    path: "department",
    name: "master-department-index",
    component: IndexView,
  },
  {
    path: "department/create",
    name: "master-department-create",
    component: CreateView,
  },
  {
    path: "department/detail/:id",
    name: "master-department-detail",
    component: DetailView,
  },
  {
    path: "department/edit/:id",
    name: "master-department-edit",
    component: EditView,
  }
]

export default routes;