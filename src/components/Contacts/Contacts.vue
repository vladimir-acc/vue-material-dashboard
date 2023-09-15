<!-- eslint-disable prettier/prettier -->
<template>
  <div class="z-100">
    <md-table
      v-model="contacts"
      :table-header-color="tableHeaderColor"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell md-label="id">{{ item.id}}</md-table-cell>
        <md-table-cell md-label="title">{{ item.title}}</md-table-cell>
        <md-table-cell md-label="address">{{ item.address }}</md-table-cell>
        <md-table-cell md-label="phone">{{ item.phone }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import api from "../../../config/config.js";
export default {
  name: "contacts",
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
    async postData(url) {
      const response = await fetch(url, {
        method: "POST",
      });
      return response.json();
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
