<!-- eslint-disable prettier/prettier -->
<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Контакти</h4>
          </md-card-header>
          <md-card-content>
            <ContactList table-header-color="blue" />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
import ContactList from "@/components/Contacts/ContactList.vue";

export default {
  components: {
    ContactList,
  },
};
</script>

<style scoped>
.md-card .md-card-header .title,
.md-card .md-card-header .category {
  color: white;
}
</style>
