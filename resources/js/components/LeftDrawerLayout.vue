<template>
  <v-navigation-drawer
      app
      clipped
      :value="drawer"
      @input="checkInput($event)"
      class="pt-4"
  >
    <v-container class="justify-center text-center">
      <div v-if="user">
        <h3>Logged in as {{ user.name }}</h3>
        <v-btn outlined color="primary" @click="logout"
        >Logout
        </v-btn
        >
      </div>
      <div v-else>
        <v-btn
            @click="toggleLogin"
            :color="loginForm ? 'primary' : ''"
            :class="loginForm ? '' : 'primary--text'"
        >Login
        </v-btn
        >
        <v-btn
            @click="toggleRegister"
            :color="registerForm ? 'primary' : ''"
            :class="registerForm ? '' : 'primary--text'"
        >Register
        </v-btn
        >

        <v-form
            v-if="loginForm"
            ref="loginForm"
            v-model="loginValid"
            lazy-validation
        >
          <v-text-field
              v-model="username"
              label="Username"
              required
          ></v-text-field>
          <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @focus="removeError"
              @keydown.enter="validateLogin"
              @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn
              :disabled="!loginValid || this.loginError === true"
              large
              outlined
              color="primary"
              class="mr-4"
              @click="validateLogin"
          >
            {{ this.btnText }}
          </v-btn>
        </v-form>
        <v-form
            v-if="registerForm"
            ref="registerForm"
            v-model="registerValid"
            lazy-validation
        >
          <v-text-field
              v-model="emailRegister"
              :rules="emailRules"
              label="Email"
              required
          ></v-text-field>
          <v-text-field
              v-model="usernameRegister"
              label="Username"
              required
          ></v-text-field>
          <v-text-field
              v-model="passwordRegister"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show2 = !show2"
          ></v-text-field>
          <v-btn
              :disabled="!registerValid"
              large
              outlined
              color="primary"
              class="mr-4"
              @click="validateRegister"
          >
            Validate
          </v-btn>
        </v-form>
      </div>
    </v-container>

    <v-list shaped>
      <v-list-item link :to="{ name: 'main' }">
        <v-list-item-content>
          <v-list-item-title> Main Channel</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :to="{ name: 'private' }">
        <v-list-item-content>
          <v-list-item-title>
            Private Channels
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :to="{ name: 'about' }">
        <v-list-item-content>
          <v-list-item-title> About</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";

export default {
  name: "left-drawer-layout",
  data() {
    return {
      // user: voir le computed user(),
      loginValid: true,
      registerValid: true,
      loginForm: false,
      loginError: false,
      registerForm: false,
      username: "",
      usernameRegister: "",
      password: "",
      passwordRegister: "",
      emailRegister: "",
      show1: false,
      show2: false,
      emailRules: [
        (value) => !!value || "Required.",
        (v) => /.+@.+\..+/.test(v) || "email must be valid",
      ],
      passwordRules: [
        (value) => !!value || "Required.",
        (v) => v.length >= 6 || "Min 6 characters",
      ],
    };
  },
  computed: {
    user() {
      if (this.$store.getters.isConnected) {
        return this.$store.getters.user;
      } else {
        return null;
      }
    },
    drawer() {
      return this.$store.getters.drawer;
    },
    btnText() {
      if (this.loginError) {
        return "Credentials error"
      } else {
        return "Validate"
      }
    }
  },
  methods: {
    removeError() {
      this.loginError = false
    },
    checkInput(event) {
      this.$store.dispatch("updateDrawer", event);
    },
    logout: function () {
      axios.post("/logout").then((Response) => {
        location.reload();
      });
    },
    toggleLogin() {
      this.loginForm = !this.loginForm;
      this.registerForm = false;
    },
    toggleRegister() {
      this.registerForm = !this.registerForm;
      this.loginForm = false;
    },
    validateLogin() {
      if (this.$refs.loginForm.validate()) {
        axios
            .post("/login", {
              name: this.username,
              password: this.password,
            })
            .then((response) => {
              location.reload();
            })
            .catch((e) => {
              // console.log(e.response)
              // console.log(e.response.status)
              // console.log(e.response.data)
              if (e.response.status === 422) {
                this.loginError = true
                this.password = ''
              }
            });
      }
    },
    validateRegister() {
      if (this.$refs.registerForm.validate()) {
        axios
            .post("/register", {
              email: this.emailRegister,
              name: this.usernameRegister,
              password: this.passwordRegister,
              password_confirmation: this.passwordRegister,
            })
            .then((Response) => {
              if (Response.status == 201) {
                axios
                    .post("/login", {
                      name: this.usernameRegister,
                      password: this.passwordRegister,
                    })
                    .then((Response) => {
                      location.reload();
                    });
              }
            });
      }
    },
  },
};
</script>

<style>
.v-list-item--active {
  background-color: #00796b !important;
  color: white !important;
}
</style>
