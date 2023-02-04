const IndexView = () => import("@/views/admin/SurveyData/IndexView.vue");
const CreateView = () => import("@/views/admin/SurveyData/CreateView.vue");
const EditView = () => import("@/views/admin/SurveyData/EditView.vue");
const DetailView = () => import("@/views/admin/SurveyData/DetailView.vue");

const routes = [
  {
    path: "survey-data",
    name: "admin-survey-data",
    component: IndexView,
  },
  {
    path: "survey-data/create",
    name: "admin-survey-data-create",
    component: CreateView,
  },
  {
    path: "survey-data/detail/:id",
    name: "admin-survey-data-detail",
    component: DetailView,
  },
  {
    path: "survey-data/edit/:id",
    name: "admin-survey-data-edit",
    component: EditView,
  }
]

export default routes;