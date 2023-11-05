<!-- eslint-disable vue/no-dupe-keys -->
<!-- eslint-disable prettier/prettier -->
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
        <h4 class="title">Редагувати</h4>
        <div>
          <md-button
            class="md-just-icon md-simple md-primary"
            @click="hide()"
          >
            <md-icon>close</md-icon>
            <md-tooltip md-direction="top">Закрыть</md-tooltip>
          </md-button>
        </div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Тривалість</label>
              <md-input
                v-model="duration"
                type="text"
              >{{ duration }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Період</label>
              <md-input
                v-model="period"
                type="text"
              >{{ period }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Вартість</label>
              <md-input
                v-model="cost"
                type="text"
              >{{ cost }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Посилання</label>
              <md-input
                v-model="link"
                type="text"
              >{{ link }}</md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button
              class="md-raised md-success"
              @click="edit()"
            >Зберегти</md-button>
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
      duration: "",
      period: "",
      cost: "",
      link: "",
    };
  },
  methods: {
    show(id, duration, period, cost, link) {
      this.id = id;
      this.duration = duration;
      this.period = period;
      this.cost = cost;
      this.link = link;
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
    async edit() {
      const data = {
        id: this.id,
        duration: this.duration,
        period: this.period,
        cost: this.cost,
        link: this.link,
      };
      const result = await fetch(
        `http://${api.host}:${api.port}/course_terms/update/${this.id}`,
        {
          method: "PUT",
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
        this.$emit("termsEdit", this.id);
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
.md-field label.required {
  color: #e49393 !important;
}
</style>
