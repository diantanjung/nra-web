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
    roles: ALL,
  },
  {
    name: 'Approval',
    to: 'admin-approval',
    icon: 'si si-check',
    roles: ALL,
  },
  {
    name: 'Log Book',
    to: 'admin-log-book',
    icon: 'si si-notebook',
    roles: ALL,
  },
  {
    name: 'Announcement',
    to: 'admin-announcement',
    icon: 'si si-feed',
    roles: ALL,
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
    roles: ALL,
  },
  {
    name: 'Schedule',
    to: 'admin-schedule',
    icon: 'si si-calendar',
    roles: ALL,
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
    roles: ALL,
  },
  
  {
    name: 'Store',
    to: 'admin-store',
    icon: 'fa fa-store',
    roles: ALL,
  },
  
  {
    name: 'Product',
    to: 'admin-product',
    icon: 'si si-basket',
    roles: ALL,
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
    name: 'Product Category',
    to: 'master-product-category-index',
    icon: 'si si-tag',
    roles: [ADMIN]
  },
]