<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <md-toolbar
    md-elevation="0"
    class="md-transparent"
    style="z-index: 1;"
  >
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="selectedUser"
              :md-options="users"
              @click="fetchUsers();alert('sdfgdsf')"
            >
              <label>Search...</label>
            </md-autocomplete>
          </div>
          <md-list>
            <!-- <md-list-item href="#/">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item> -->
            <!-- <li class="md-list-item">
              <a
                href="#/notifications"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span class="notification">5</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#">Mike John responded to your email</a></li>
                      <li><a href="#">You have 5 new tasks</a></li>
                      <li><a href="#">You're now friend with Andrew</a></li>
                      <li><a href="#">Another Notification</a></li>
                      <li><a href="#">Another One</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li> -->

            <md-list-item href="#/users">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
            </md-list-item>
            <md-list-item
              href="#"
              @click.prevent="logout()"
            >
              <i class="material-icons">logout</i>
              <p class="hidden-lg hidden-md">Profile</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import api from "../../../config/config.js";
export default {
  data() {
    return {
      selectedUser: null,
      users: [
        // "Jim Halpert",
        // "Dwight Schrute",
        // "Michael Scott",
        // "Pam Beesly",
        // "Angela Martin",
        // "Kelly Kapoor",
        // "Ryan Howard",
        // "Kevin Malone",
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    async fetchUsers() {
      await this.postDataUsers(
        `http://${api.host}:${api.port}/users/read/`
      ).then((data) => {
        for (const id in data) {
          this.users.push(data[id].login);
        }
      });
    },
    async postDataUsers(url) {
      const response = await fetch(url, {
        method: "POST",
      });
      return response.json();
    },
    logout() {
      const id = { userId: 3 };
      this.postData(`http://${api.host}:${api.port}/users/logout/`, id).then(
        (data) => {
          // eslint-disable-next-line prettier/prettier
          document.cookie = `accessToken=${data.accessToken
            }; expires=${new Date(Date.now())}`;
          localStorage.clear();
          this.$router.push("/login");
        }
      );
    },
    async postData(url, data) {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style lang="css"></style>
