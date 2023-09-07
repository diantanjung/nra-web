const IndexView = () => import("@/views/admin/Attendance/IndexView.vue");
// const DetailView = () => import("@/views/admin/Attendance/DetailView.vue");

const routes = [
  {
    path: "attendance",
    name: "admin-attendance",
    component: IndexView,
  },
  //   {
  //     path: "attendance/detail/:id",
  //     name: "admin-attendance-detail",
  //     component: DetailView,
  //   },
];

export default routes;
