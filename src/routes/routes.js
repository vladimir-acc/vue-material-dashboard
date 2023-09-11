import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import EmptyLayout from "@/pages/Layout/EmtyLayout.vue";

import Login from "@/pages/Login.vue";
import Camp from "@/pages/Camp.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "users",
        name: "Пользователи",
        component: UserProfile,
        meta: {
          requiresAuth: true,
          requireAdmin: true,
        },
      },
      {
        path: "table",
        name: "Table List",
        component: TableList,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "camp",
        name: "Camp",
        component: Camp,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
          requiresAuth: true,
        },
        component: Maps,
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
        meta: {
          requiresAuth: true,
        },
      },

    ],
  },
  {
    path: "/",
    component: EmptyLayout,
    children: [
      {
        path: "Login",
        name: "Login",
        component: Login,
      },
    ],
  }
];

export default routes;
