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
              <label class="required">Назва напрямку/курсу*</label>
              <md-input
                v-model="title"
                type="text"
              >{{ title }}</md-input>
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
      id: "",
      title: "",
      tableName: "",
    };
  },
  methods: {
    show(id, title, table) {
      this.id = id;
      this.title = title;
      this.tableName = table;
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
    async edit() {
      const data = {
        id: this.id,
        title: this.title,
      };
      if (!data.id || !data.title) {
        alert("Не заповнено Назва напрямку/курсу*");
        return;
      }
      if (this.tableName === "types_of_courses") {
        const result = await fetch(
          `http://${api.host}:${api.port}/types_of_courses/update/${this.id}`,
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
          this.$emit("typedit");
        }
      } else if (this.tableName === "course") {
        const result = await fetch(
          `http://${api.host}:${api.port}/course/update/${this.id}`,
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
          this.$emit("coursEdit");
          this.$emit("titleUpdate", result.data.title);
        }
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
