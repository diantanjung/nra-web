const IndexView = () => import("@/views/admin/Contract/IndexView.vue");
const CreateView = () => import("@/views/admin/Contract/CreateView.vue");
const EditView = () => import("@/views/admin/Contract/EditView.vue");
const DetailView = () => import("@/views/admin/Contract/DetailView.vue");

const routes = [
  {
    path: "contract",
    name: "master-contract-index",
    component: IndexView,
  },
  {
    path: "contract/create",
    name: "master-contract-create",
    component: CreateView,
  },
  {
    path: "contract/detail/:id",
    name: "master-contract-detail",
    component: DetailView,
  },
  {
    path: "contract/edit/:id",
    name: "master-contract-edit",
    component: EditView,
  }
]

export default routes;