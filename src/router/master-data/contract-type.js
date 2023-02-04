const IndexView = () => import("@/views/admin/ContractType/IndexView.vue");
const CreateView = () => import("@/views/admin/ContractType/CreateView.vue");
const EditView = () => import("@/views/admin/ContractType/EditView.vue");
const DetailView = () => import("@/views/admin/ContractType/DetailView.vue");

const routes = [
  {
    path: "contract-type",
    name: "master-contract-type-index",
    component: IndexView,
  },
  {
    path: "contract-type/create",
    name: "master-contract-type-create",
    component: CreateView,
  },
  {
    path: "contract-type/detail/:id",
    name: "master-contract-type-detail",
    component: DetailView,
  },
  {
    path: "contract-type/edit/:id",
    name: "master-contract-type-edit",
    component: EditView,
  }
]

export default routes;