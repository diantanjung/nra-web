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
    name: 'Attendance',
    to: 'admin-attendance',
    icon: 'si si-user-following',
    roles: [ADMIN],
  },
  {
    name: 'Approval',
    to: 'admin-approval',
    icon: 'si si-check',
    roles: [ADMIN],
  },
  {
    name: 'Log Book',
    to: 'admin-log-book',
    icon: 'si si-notebook',
    roles: [ADMIN],
  },
  {
    name: 'Announcement',
    to: 'admin-announcement',
    icon: 'si si-feed',
    roles: [ADMIN],
  },
  {
    name: "Surveyor",
    heading: true,
    roles: [ADMIN]
  },
  {
    name: 'Survey Data',
    to: 'admin-survey-data',
    icon: 'si si-note',
    roles: [ADMIN],
  },
  {
    name: 'Schedule',
    to: 'admin-schedule',
    icon: 'si si-calendar',
    roles: [ADMIN],
  },
  {
    name: 'Report',
    to: 'admin-report',
    icon: 'si si-pie-chart',
    roles: [ADMIN]
  },
  
  {
    name: 'Import',
    to: 'admin-import',
    icon: 'si si-cloud-upload',
    roles: [ADMIN],
  },
  
  {
    name: 'Store',
    to: 'admin-store',
    icon: 'fa fa-store',
    roles: [ADMIN],
  },
  
  {
    name: 'Product',
    to: 'admin-product',
    icon: 'si si-basket',
    roles: [ADMIN],
  },
  {
    name: "Master",
    heading: true,
    roles: [ADMIN]
  },
  {
    name: 'User',
    to: 'master-user-index',
    icon: 'si si-users',
    roles: [ADMIN]
  },
  {
    name: 'Activity Log',
    to: 'master-activity-log-index',
    icon: 'si si-clock',
    roles: [ADMIN]
  },
  {
    name: 'Client',
    to: 'master-client-index',
    icon: 'si si-briefcase',
    roles: [ADMIN]
  },
  {
    name: 'Contract',
    to: 'master-contract-index',
    icon: 'si si-docs',
    roles: [ADMIN]
  },
  {
    name: 'Department',
    to: 'master-department-index',
    icon: 'si si-grid',
    roles: [ADMIN]
  },
  {
    name: 'Area',
    to: 'master-area-index',
    icon: 'si si-globe-alt',
    roles: [ADMIN]
  },
  {
    name: 'Regulation',
    to: 'master-regulation-index',
    icon: 'si si-list',
    roles: [ADMIN]
  },
  {
    name: 'Archive',
    to: 'master-archive-index',
    icon: 'si si-folder-alt',
    roles: [ADMIN]
  },
  {
    name: 'Supplier',
    to: 'master-supplier-index',
    icon: 'fa fa-truck-fast',
    roles: [ADMIN]
  },
  {
    name: 'Product Category',
    to: 'master-product-category-index',
    icon: 'si si-tag',
    roles: [ADMIN]
  },
]