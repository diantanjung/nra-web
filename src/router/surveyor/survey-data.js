
// * REPORT
const IndexView = () => import("@/views/admin/SurveyData/IndexView.vue");

const routes = [
  {
    path: "survey-data",
    name: "admin-survey-data",
    component: IndexView,
  }
]

export default routes;