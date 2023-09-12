<!-- eslint-disable vue/no-dupe-keys -->
<!-- eslint-disable prettier/prettier -->
<template>
  <form
    class="md-overlay md-fixed md-dialog-overlay"
    v-if="isVisible"
  >
    <md-card class="form-modal">
      <md-card-header
        class="flex"
        data-background-color="blue"
      >
        <h4 class="title">Додати новий запис</h4>
        <div>
          <md-button
            class="md-just-icon md-simple md-primary"
            @click="hide()"
          >
            <md-icon>close</md-icon>
            <md-tooltip md-direction="top">Приховати</md-tooltip>
          </md-button>
        </div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Заголовок*</label>
              <md-input
                v-model="subtitle"
                type="text"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Період</label>
              <md-input
                v-model="period"
                type="text"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Термін</label>
              <md-input
                v-model="other"
                type="text"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Порядок сортування</label>
              <md-input
                v-model="sortId"
                type="number"
                min="0"
              >1</md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button
              class="md-raised md-success"
              @click="add()"
            >Додати</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import api from "../../../config/config.js";
export default {
  name: "edit-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isVisible: false,
      subtitle: "",
      period: "",
      other: "",
      sortId: 1,
      campId: "",
    };
  },
  methods: {
    show(id) {
      this.isVisible = true;
      this.campId = id;
    },
    hide() {
      this.isVisible = false;
    },
    async add() {
      const data = {
        campId: this.campId,
        subtitle: this.subtitle,
        period: this.period,
        other: this.other,
        sortId: this.sortId,
      };

      if (!data.campId || !data.subtitle) {
        alert("Не заповнено Заголовок*");
        return;
      }
      const result = await fetch(
        `http://${api.host}:${api.port}/camp_terms/create/`,
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
          console.dir(err);
        });
      if (result.err) alert(result.err);
      else {
        this.hide();
        this.$emit("add", data.campId);

        this.subtitle = "";
        this.period = "";
        this.other = "";
        this.sortId = 1;
        this.campId = "";
      }
    },
  },
};
</script>
<style>
@media (min-width: 315px) and (max-width: 767px) {
  .form-modal {
    left: 0 !important;
    max-width: 100%;
  }
}
.form-modal {
  max-width: 750px;
  left: calc(50vw - 280px);
}
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
