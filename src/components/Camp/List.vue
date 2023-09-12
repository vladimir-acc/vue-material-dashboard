<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <CampEdit
      ref="campEdit"
      @campedit="fetchCamp"
    />
    <md-table
      v-model="camp"
      @md-selected="onSelect"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="single"
        :class="getClass(selected?selected:item)"
        @click="getTerms({campId:item.id}); getId(item.id)"
      >
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Заголовок">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Посилання">{{ item.link }}</md-table-cell>
        <md-table-cell md-label="Ціна">{{ item.price }}</md-table-cell>
        <md-table-cell md-label="Подія">
          <md-button
            class="md-just-icon md-simple md-primary"
            @click="openFormEdit(item.id, item.title, item.link, item.price)"
          >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Редагування</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <hr />
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      <md-card>
        <md-card-header data-background-color="blue">
          <h4 class="title">Camp</h4>
          <p class="category">Категорія 2 рівня</p>
        </md-card-header>
        <md-card-content>
          <Terms ref="campTerms" />
        </md-card-content>
      </md-card>
    </div>
  </div>

</template>

<script>
import api from "../../../config/config.js";
import Terms from "@/components/Camp/Terms.vue";
import CampEdit from "@/components/Camp/CampEdit.vue";

export default {
  name: "Terms-table",
  components: { Terms, CampEdit },

  data() {
    return {
      selected: { id: 1 },
      camp: [],
    };
  },
  methods: {
    async fetchCamp() {
      await this.postData(`http://${api.host}:${api.port}/camp/read/`).then(
        (data) => {
          this.camp = data;
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
        await fetch(`http://${api.host}:${api.port}/camp/delete/${id}`, {
          method: "DELETE",
        });
        await this.postData(`http://${api.host}:${api.port}/camp/read/`).then(
          (data) => {
            this.camp = data;
          }
        );
      }
    },

    openFormEdit(id, title, link, price) {
      this.$refs.campEdit.show(id, title, link, price);
    },
    closeForm() {
      this.isVisible = false;
    },
    getClass: ({ id }) => ({
      // 'md-primary': id === 2,
      // 'md-accent': id > 0
      "md-default": id > 0,
    }),
    onSelect(item) {
      this.selected = item;
      // this.$emit("selected", this.selected.id);
    },
    getTerms(id) {
      this.$refs.campTerms.fetchTerms(id);
    },
    getId(id) {
      this.$refs.campTerms.getId(id);
    },
  },
  mounted() {
    // this.onSelect(this.selected);
    this.fetchCamp();
  },
};
</script>
<style lang="scss" scoped>
.z-100 {
  z-index: 100;
}
.md-table + .md-table {
  margin-top: 16px;
}
.md-table.md-theme-default .md-table-row.md-selected-single {
  background-color: rgb(241, 240, 255);
}
hr {
  margin: 30px 0 30px;
}
.md-table-cell {
  padding: 0;
  height: 32px;
}
.md-button.md-just-icon {
  max-height: 28px;
}
.md-card .md-card-header .title,
.md-card .md-card-header .category {
  color: white;
}
</style>
