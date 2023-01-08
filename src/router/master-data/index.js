import UserRoutes from "./user.js";

const routes = [
  {
    path: "master",
    redirect: "/master/user",
    children: [
      ...UserRoutes
    ],
  },
]

export default routes;