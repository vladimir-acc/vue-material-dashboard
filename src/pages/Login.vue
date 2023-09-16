<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="content">
    <div class="md-layout">
      <div class="backdores"></div>
      <form @submit.prevent="submit">
        <dir class="px-0">
          <h2 class="text-center">Вхід</h2>
        </dir>
        <div class="grid grid-cols-1 gap-6 mb-4">
          <div class="flex flex-col items-baseline">
            <input
              type="text"
              placeholder="Введіть ваш login"
              v-model="login"
            />
            <div class="errors">
              <div class=""></div>
            </div>
          </div>

          <div class="flex flex-col items-baseline">
            <input
              type="password"
              placeholder="Введіть ваш пароль"
              v-model="password"
            />
            <div class="errors"></div>
          </div>
        </div>

        <button class="btn btn-default">Увійти</button>
      </form>
    </div>
  </div>
</template>

<script>

import api from "../../config/config.js";

export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  components: {},
  methods: {
    submit() {
      const data = { login: this.login, password: this.password };
      this.postData(`http://${api.host}:${api.port}/users/auth/`, data).then(
        (data) => {
          if (data.accessToken) {
            document.cookie = `accessToken=${data.accessToken
              }; expires=${3600}`;
            localStorage.setItem("userRole", data.user.role);
            localStorage.setItem("accessToken", data.accessToken);
            this.$router.push("/dashboard");
          } else {
            if (data.message === "login Not Found")
              alert("Логін введено не вірно\nабо користувач не активован");
            else if (data.message === "Error: Invalid password")
              alert("Пароль введено не вірно");
            else alert(data.message);
          }
        }
      );
    },
    async postData(url, data) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },
};
</script>

<style scoped lang="scss">
// @import "../../assets/scss/_form.scss";
form {
  background-color: #fff;
  border-radius: 60px 0;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
  font-size: 16px;
  width: 100%;
  max-width: 480px;
  margin: 10dvh auto;
  border: 1px solid #eee;
  padding: 35px;
}

input {
  background: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
  padding: 10px;
  width: 100%;
  margin-bottom: 25px;
  cursor: pointer;
  border: none;
  min-height: 38px;
}
select {
  border-radius: 10px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
  padding: 10px;
  width: 100%;

  cursor: pointer;
  border: none;
}
select > option:checked {
  opacity: 0.5;
}
input::placeholder,
select[name="direction"],
textarea[name="message"] {
  opacity: 0.7;
}
.btn {
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
  max-width: 100%;
  cursor: pointer;
}
.backdores {
  height: 100dvh;
  width: 100dvw;
  position: absolute;
  background-color: rgb(190, 188, 188);
  z-index: -1;
  opacity: 0.15;
  top: 0;
}

@media (min-width: 315px) and (max-width: 560px) {
  form {
    padding: 20px 35px;
    width: 100%;
    left: 0;
  }
}
@media (max-height: 440px) {
  form {
    top: calc(50dvh - 13rem) !important;
  }
}
.btn-back {
  background: #464a96;
  border-radius: 32px;
  color: #fff;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 12px;
  font-weight: 400;
  left: 20px;
  line-height: 18px;
  opacity: 0.5;
  padding: 21px 25px;
  position: fixed;
  text-align: left;
  top: 35%;
  z-index: 99;

  &:hover {
    transition-duration: 0.4s;
    opacity: 1;
  }
}

.btn {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  border-radius: 10px 0;
  padding: 12px 50px;
}

a {
  .btn {
    font-family: "Open Sans", serif;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    border-radius: 10px 0;
    padding: 12px 50px;
    line-height: 100%;
  }
}

.btn-default {
  background-color: #ffd33c;
  border: 3px solid #fcd13f;
  z-index: 1;

  &:hover {
    transition: all 0.3s;
    box-shadow: 0 1px 8px -2px hsla(53, 5%, 67%, 0.78);
    color: #fff;
  }
}

.btn-primary {
  background-color: #fff;
  color: #2c2e39;
  border: solid 1px #fee5b2;

  &:hover {
    transition: all 0.3s;
    box-shadow: 0 1px 8px -2px hsla(53, 5%, 67%, 0.78);
    color: #ebb63a;
  }
}

.btn-secondary {
  border: 3px solid #fcd13f;
  background: transparent;
  color: #2c2e39;

  &:hover {
    transition: all 0.3s;
    box-shadow: 0 1px 8px -2px hsla(53, 5%, 67%, 0.78);
    color: #ebb63a;
  }
}

.btn-trans {
  border: 3px solid #fff;
  background: transparent;
  color: #2c2e39;

  &:hover {
    transition: all 0.3s;
    box-shadow: 0 1px 8px -2px hsla(53, 5%, 67%, 0.78);
    border: 3px solid #ebb63a;
    color: hsla(53, 10%, 47%, 0.78);
  }
}

@media (min-width: 315px) and (max-width: 767px) {
  .btn {
    width: 100%;
    max-width: 100%;
  }

  .btn-back {
    left: 5px;
    top: 75px;
    transform: scale(0.7);
  }
}
</style>
