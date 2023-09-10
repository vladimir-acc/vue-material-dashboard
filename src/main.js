/* eslint-disable prettier/prettier */

import Vue from "vue";

import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";
import auth from "@/middleware/auth.js";
import role from "@/middleware/role.js";


// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  data: {
    Chartist: Chartist,
  },
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) { // middleware auth
    auth(to, from, next);
    if (to.matched.some((record) => record.meta.requireAdmin)) { // middleware role
      role(to, from, next);
    } else {
      next();
    }
  } else {
    next();
  }
});
