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
              <label>Login*</label>
              <md-input
                v-model="login"
                type="text"
              >{{ login }}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Email*</label>
              <md-input
                v-model="email"
                type="email"
              >{{ email }}</md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label for="role">Role*</label>
              <md-select
                v-model="role"
                name="role"
                id="role"
              >
                <md-option value="ADMIN">ADMIN</md-option>
                <md-option value="USER">USER</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-50">
            <md-checkbox v-model="actived">Actived</md-checkbox>

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
    user: {
      login: {
        type: String,
        default: "Admin",
      },
      email: {
        type: String,
        default: "",
      },
      role: {
        type: String,
        default: "USER",
      },
      actived: {
        type: Boolean,
      },
    },
  },
  data() {
    return {
      isVisible: false,
      login: "",
      email: "",
      role: "USER",
      actived: true,
    };
  },
  methods: {
    show(id, login, email, role, actived) {
      this.id = id;
      this.login = login;
      this.email = email;
      this.role = role;
      this.actived = actived === 1 ? true : false;

      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
    async edit() {
      const data = {
        id: this.id,
        login: this.login,
        email: this.email,
        role: this.role,
        actived: this.actived,
      };

      if (!data.id) return;
      const result = await fetch(
        `http://${api.host}:${api.port}/users/update/${this.id}`,
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
          alert(err);
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
