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
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Заголовок*</label>
              <md-input
                v-model="title"
                type="text"
              >{{ title }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Ціна</label>
              <md-input
                v-model="price"
                type="text"
              >{{ price }}</md-input>
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
      subtitle: "",
      period: "",
      other: "",
      sortId: 1,
      campId: "",
    };
  },
  methods: {
    show(id, title, link, price) {
      this.id = id;
      this.title = title;
      this.link = link;
      this.price = price;

      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
    async edit() {
      const data = {
        id: this.id,
        title: this.title,
        link: this.link,
        price: this.price,
      };

      if (!data.campId || !data.subtitle) {
        alert("Не заповнено Заголовок*");
        return;
      }
      const result = await fetch(
        `http://${api.host}:${api.port}/camp/update/${this.id}`,
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
        this.$emit("campedit");
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
