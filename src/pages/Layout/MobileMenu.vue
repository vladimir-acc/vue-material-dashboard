<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <md-field>
        <label>Search</label>
        <md-input
          v-model="search"
          type="text"
        ></md-input>
      </md-field>
    </li>

    <li>
      <drop-down>
        <a
          slot="title"
          class="dropdown-toggle"
          data-toggle="dropdown"
        >
          <i class="material-icons">notifications</i>
          <span class="notification">5</span>
          <p>Notifications</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li><a href="#">Mike John responded to your email</a></li>
          <li><a href="#">You have 5 new tasks</a></li>
        </ul>
      </drop-down>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      selectedEmployee: null,
      employees: ["Jim Halpert", "Dwight Schrute", "Michael Scott"],
    };
  },
};
</script>
