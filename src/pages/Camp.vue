<!-- eslint-disable prettier/prettier -->
<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">CAMP</h4>
            <p class="category">Категорія 1 рівня</p>
          </md-card-header>
          <md-card-content>
            <list table-header-color="blue"></list>
          </md-card-content>
        </md-card>
      </div>

    </div>
  </div>
</template>

<script>
import list from "@/components/Camp/List.vue";

export default {
  components: {
    list,
  },
};
</script>

<style scoped>
.md-card .md-card-header .title,
.md-card .md-card-header .category {
  color: white;
}
</style>
