<!-- eslint-disable prettier/prettier -->
<template>
  <div class="z-100">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      <Edit
        data-background-color="blue"
        class="z-100"
        ref="editForm"
        @edit="fetchUsers"
      />

    </div>
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      <Add
        data-background-color="blue"
        class="z-100"
        ref="addForm"
        @register="fetchUsers"
      />
    </div>
    <!-- <div style="display: flex; justify-content: end;">
      <md-button
        class="md-just-icon  md-icon-button md-success"
        @click="openFormAdd()"
      >
        <md-icon>add</md-icon>
      </md-button>
    </div> -->
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
        <md-table-cell
          class="md-size-10"
          md-label="Action"
        >
          <md-button
            class="md-just-icon md-simple md-primary"
            @click="openFormEdit(item.id,item.login, item.email,item.role,item.actived)"
          >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit</md-tooltip>
          </md-button>
          <md-button
            class="md-just-icon md-simple md-danger"
            @click="onDelete(item.id, item.login)"
          >
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="top">Delete</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-button
      class="md-dense md-raised md-custom"
      @click="openFormAdd()"
    >Додати</md-button>
  </div>
</template>

<script>
import api from "../../../config/config.js";
import Edit from "@/components/Users/Edit.vue";
import Add from "@/components/Users/Add.vue";
export default {
  name: "user-list",
  components: {
    Edit, Add,
  },
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
      await this.postData(`http://${api.host}:${api.port}/users/read/`).then((data) => {
        this.users = data;
      });
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
