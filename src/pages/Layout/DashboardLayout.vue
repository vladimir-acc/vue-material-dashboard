<!-- eslint-disable prettier/prettier -->
<template>
  <div
    class="wrapper"
    :class="{ 'nav-open': $sidebar.showSidebar }"
  >
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Дашборд</p>
      </sidebar-link>
      <sidebar-link to="/users">
        <md-icon>person</md-icon>
        <p>Користувачи</p>
      </sidebar-link>

      <sidebar-link to="/camp">
        <md-icon>content_paste</md-icon>
        <p>Camp</p>
      </sidebar-link>
      <sidebar-link to="/courses">
        <md-icon>content_paste</md-icon>
        <p>Курси/Заняття</p>
      </sidebar-link>

      <sidebar-link to="/contacts">
        <md-icon>room</md-icon>
        <p>Контакти</p>
      </sidebar-link>
      <!-- <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link> -->
      <!-- <sidebar-link
        to="/upgrade"
        class="active-pro"
      >
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link> -->
      <hr style="width: 85%; margin-top: 5rem;">
      <sidebar-link to="/logout">
        <md-icon>logout</md-icon>
        <p>Вмхід</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";

export default {
  middleware: "authenticated",
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "blue",
      sidebarBackgroundImage: require("@/assets/img/julia-w.webp"),
      userToken: "",
      data: "",
      role: "",
      id: "",
    };
  },
};
</script>
<style lang="scss">
.fixed-plugin .dropdown {
  display: none;
}
</style>
