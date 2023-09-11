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
              <label>subtitle</label>
              <md-input
                v-model="subtitle"
                type="text"
              >{{ subtitle }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>period</label>
              <md-input
                v-model="period"
                type="text"
              >{{ period }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>other</label>
              <md-input
                v-model="other"
                type="text"
              >{{ other }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>sortId</label>
              <md-input
                v-model="sortId"
                type="number"
                min="0"
              >{{ sortId }}</md-input>
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
      subtitle: "",
      period: "",
      other: "",
      sortId: null,
    };
  },
  methods: {
    show(id, subtitle, period, other, sortId) {
      this.id = id;
      this.subtitle = subtitle;
      this.period = period;
      this.other = other;
      this.sortId = sortId;

      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
    async edit() {
      const data = {
        id: this.id,
        subtitle: this.subtitle,
        period: this.period,
        other: this.other,
        sortId: this.sortId,
      };

      if (!data.id) return;
      const result = await fetch(
        `http://${api.host}:${api.port}/camp_terms/update/${this.id}`,
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
        this.$emit("edit");
      }
    },
  },
};
</script>
<style>
.form-modal {
  max-width: 750px;
  left: calc(50vw - 280px);
}
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
