/* eslint-disable no-unused-vars */
const ADMIN = 1;
const HR = 2;
const USER_GENERAL = 3;
const USER_SURVEYOR = 4;
const USER_SALES = 5;
const CLIENT = 6;
const ALL = [ADMIN, HR, USER_GENERAL, USER_SURVEYOR, CLIENT]

export default [
  {
    name: 'Dashboard',
    to: 'admin-dashboard',
    icon: 'si si-speedometer',
    roles: ALL,
  },
  {
    name: 'Report',
    to: 'admin-report',
    icon: 'si si-pie-chart',
    roles: [ADMIN]
  },
  // {
  //   name: "Data Master",
  //   icon: "fa fa-database",
  //   subActivePaths: "/admin/master",
  //   roles: [ADMIN],
  //   sub: [
  //     {
  //       name: "User",
  //       to: "master-user-index",
  //       roles: [ADMIN]
  //     }
  //   ],
  // },
]