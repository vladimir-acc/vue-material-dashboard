<!-- eslint-disable prettier/prettier -->
<template>
  <div class="content">
    <formEdit
      ref="termsEdit"
      @edit="fetchTerms({ campId})"
    />
    <formAdd
      ref="termsAdd"
      @add="fetchTerms({ campId})"
    />
    <md-table
      v-model="terms"
      @selected="getId"
    >
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
      >
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Заголовок">{{ item.subtitle }}</md-table-cell>
        <md-table-cell md-label="Період">{{ item.period }}</md-table-cell>
        <md-table-cell md-label="Термін">{{ item.other }}</md-table-cell>
        <md-table-cell md-label="Порядок сортування">{{ item.sortId }}</md-table-cell>
        <md-table-cell
          class="md-size-10"
          md-label="Подія"
        >
          <md-button
            class="md-just-icon md-simple md-primary"
            @click="openFormEdit(item.id,item.subtitle,item.period,item.other,item.sortId)"
          >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Редагування</md-tooltip>
          </md-button>
          <md-button
            class="md-just-icon md-simple md-danger"
            @click="onDelete(item.id, item.subtitle, item.campId)"
          >
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="top">Видалення</md-tooltip>
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
import formEdit from "../Camp/TermsEdit.vue";
import formAdd from "../Camp/TermsAdd.vue";

export default {
  name: "nav-tabs-table",
  components: { formEdit, formAdd, },
  data() {
    return {
      terms: [],
      campId: "",
    };
  },
  methods: {
    getId(id) {
      console.dir(id);
      this.campId = id;
      // this.$on("selected", (selectedItem) => {
      //   console.log('selectedItem');
      // });
    },
    async fetchTerms(data = { campId: 1 }) {
      const result = await fetch(
        `http://${api.host}:${api.port}/camp_terms/find/`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          console.log(err);
        });

      this.terms = result;
    },
    async postData(url) {
      const response = await fetch(url, {
        method: "POST",
      });
      return response.json();
    },
    async onDelete(id, title, campId) {
      if (
        window.confirm(`Подтвердите удаление записи - "${title} ID:${id} ... "`)
      ) {
        await fetch(`http://${api.host}:${api.port}/camp_terms/delete/${id}`, {
          method: "DELETE",
        });
        this.fetchTerms({ campId: campId });
      }
    },
    openFormAdd() {
      this.$refs.termsAdd.show(this.campId);
    },
    openFormEdit(id, subtitle, period, other, sortId) {
      this.$refs.termsEdit.show(id, subtitle, period, other, sortId, this.campId);
    },
    closeForm() {
      this.isVisible = false;
    },
  },
  mounted() {
    this.fetchTerms();
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
.text-center {
  text-align: center;
}
</style>
