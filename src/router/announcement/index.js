const IndexView = () => import("@/views/admin/Announcement/IndexView.vue");
const CreateView = () => import("@/views/admin/Announcement/CreateView.vue");
const EditView = () => import("@/views/admin/Announcement/EditView.vue");
const DetailView = () => import("@/views/admin/Announcement/DetailView.vue");

const routes = [
  {
    path: "announcement",
    name: "admin-announcement",
    component: IndexView,
  },
  {
    path: "announcement/create",
    name: "admin-announcement-create",
    component: CreateView,
  },
  {
    path: "announcement/detail/:id",
    name: "admin-announcement-detail",
    component: DetailView,
  },
  {
    path: "announcement/edit/:id",
    name: "admin-announcement-edit",
    component: EditView,
  }
]

export default routes;