<!-- eslint-disable prettier/prettier -->
<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Список пользователей</h4>
          </md-card-header>
          <md-card-content>
            <List />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/Users/List.vue";


export default {
  components: {
    List
  },
  data() {
    return {};
  },
};
</script>
