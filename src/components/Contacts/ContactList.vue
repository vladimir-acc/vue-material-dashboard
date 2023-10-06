<!-- eslint-disable prettier/prettier -->
<template>
  <div class="z-100">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      <EditForm
        data-background-color="blue"
        class="z-100"
        ref="editContact"
        @edit="fetchContacts"
      />

    </div>
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      <CreateForm
        data-background-color="blue"
        class="z-100"
        ref="addContact"
        @create="fetchContacts"
      />

    </div>
    <md-table
      v-model="contacts"
      :table-header-color="tableHeaderColor"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell md-label="id">{{ item.id}}</md-table-cell>
        <md-table-cell md-label="Назва">{{ item.title}}</md-table-cell>
        <md-table-cell md-label="Адреса">{{ item.address }}</md-table-cell>
        <md-table-cell md-label="Телефон">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.phone }}</md-table-cell>
        <md-table-cell
          class="md-size-10"
          md-label="Подія"
        >
          <md-button
            class="md-just-icon md-simple md-primary"
            @click="openFormEdit(item.id,item.title, item.address, item.email, item.phone)"
          >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Редагувати</md-tooltip>
          </md-button>
          <md-button
            class="md-just-icon md-simple md-danger"
            @click="onDelete(item.id, item.title)"
          >
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="top">Видалити</md-tooltip>
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
import EditForm from "../Contacts/ContactEdit.vue";
import CreateForm from "../Contacts/ContactAdd.vue";
export default {
  name: "contacts",
  components: { EditForm, CreateForm },
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isVisible: true,
      contacts: [],
    };
  },
  methods: {
    async fetchContacts() {
      await this.postData(`http://${api.host}:${api.port}/contact/read/`).then(
        (data) => {
          this.contacts = data;
        }
      );
    },
    async createContact() {
      await this.postData(`http://${api.host}:${api.port}/contact/create`).then(
        (data) => {
          this.contacts = data;
        }
      );
    },
    async postData(url) {
      const response = await fetch(url, {
        method: "POST",
      });
      return response.json();
    },
    openFormEdit(id, title, address, email, phone) {
      this.$refs.editContact.show(id, title, address, email, phone);
    },
    closeForm() {
      this.isVisible = false;
    },
    openFormAdd() {
      this.$refs.addContact.show();
    },
    async onDelete(id, title) {
      if (
        window.confirm(`Подтвердите удаление записи - "${title} ID:${id} ... "`)
      ) {
        await fetch(`http://${api.host}:${api.port}/contact/delete/${id}`, {
          method: "DELETE",
        });
        this.fetchContacts();
      }
    },
  },
  mounted() {
    this.fetchContacts();
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
