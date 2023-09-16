<!-- eslint-disable prettier/prettier -->
<template>
  <div class="z-100">
    <md-table
      v-model="users"
      :table-header-color="tableHeaderColor"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell md-label="id">{{ item.id}}</md-table-cell>
        <md-table-cell md-label="Login">{{ item.login}}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Actived">
          <input
            type="checkbox"
            :checked="item.actived"
            disabled
          >
        </md-table-cell>
        <md-table-cell md-label="Role">{{ item.role }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import api from "../../../config/config.js";
export default {
  name: "users",
  components: {},
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isVisible: true,
      selected: [],
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      await this.postData(`http://${api.host}:${api.port}/users/read/`).then(
        (data) => {
          this.users = data;
        }
      );
    },
    async postData(url) {
      const response = await fetch(url, {
        method: "POST",
      });
      return response.json();
    },
    async onDelete(id, login) {
      if (window.confirm(`Подтвердите удаление пользователя - ${login}`)) {
        await fetch(`http://${api.host}:${api.port}/users/delete/${id}`, {
          method: "DELETE",
        });
        await this.postData(`http://${api.host}:${api.port}/users/read/`).then(
          (data) => {
            this.users = data;
          }
        );
      }
    },
    openFormAdd() {
      // this.refs('editForm').show();
      this.$refs.addForm.show();
    },
    openFormEdit(id, login, email, role, actived) {
      this.$refs.editForm.show(id, login, email, role, actived);
    },
    closeForm() {
      this.isVisible = false;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
<style scoped>
.z-100 {
  z-index: 100;
}
.md-table-cell {
  padding: 0;
  height: 32px;
}
.md-button.md-fab,
.md-button.md-just-icon {
  max-height: 28px;
}
.md-custom {
  background-color: #26c6da !important;
  margin-left: calc(100% - 140px);
}
.md-custom:hover {
  background-color: #27a7b8 !important;
}
</style>
