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
        :data-background-color="dataBackgroundColor"
      >
        <h4 class="title">Додати адресу</h4>
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
              <label>Title</label>
              <md-input
                v-model="title"
                type="text"
                required
              >{{ title }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>address</label>
              <md-input
                v-model="address"
                type="text"
                required
              >{{ address }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field aria-required="true">
              <label>email</label>
              <md-input
                v-model="email"
                type="email"
                pattern=".+@globex\.com"
                size="30"
                required
              >{{ email }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>+38 (0XX) XXX XX XX</label>
              <md-input
                v-model="phone"
                type="tel"
                v-mask="'+38 (0##) ### ## ##'"
                minlength="19"
                maxlength="19"
                required
              >{{ phone }}</md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button
              class="md-raised md-success"
              @click="create()"
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
  name: "create-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
    contact: {
      title: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
    },
  },
  data() {
    return {
      isVisible: false,
      title: "",
      address: "",
      email: "",
      phone: "",
    };
  },
  methods: {
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
    async create() {
      const data = {
        title: this.title,
        address: this.address,
        email: this.email,
        phone: this.phone,
      };
      if (Object.values(data).some((item) => !item)) {
        alert("Заповніть обов\`язкові поля");
        return;
      }
      const result = await fetch(
        `http://${api.host}:${api.port}/contact/create/`,
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
          alert(err);
        });

      if (result.err || result.message) {
        alert(result.err ? result.err : result.message);
      } else {
        this.hide();
        this.$emit("create");
        this.title = "";
        this.address = "";
        this.email = "";
        this.phone = "";
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
