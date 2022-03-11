<template>
    <v-navigation-drawer app>
        <v-sheet color="grey lighten-5" width="100%">
            <v-container class="justify-center text-center">
                <div v-if="user">
                    <h2>Logged in as {{ user.name }}</h2>
                    <v-btn @click="logout">Logout</v-btn>
                </div>
                <div v-else>
                    <v-btn @click="toggleLogin">Login</v-btn>
                    <v-btn @click="toggleRegister">Register</v-btn>

                    <v-form
                        v-if="loginForm"
                        ref="loginForm"
                        v-model="loginValid"
                        lazy-validation
                    >
                        <v-text-field
                            v-model="username"
                            :counter="10"
                            :rules="usernameRules"
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
                            @click:append="show1 = !show1"
                        ></v-text-field>
                        <v-btn
                            :disabled="!loginValid"
                            color="success"
                            class="mr-4"
                            @click="validateLogin"
                        >
                            Validate
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
                            :counter="10"
                            :rules="emailRules"
                            label="Email"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="usernameRegister"
                            :counter="10"
                            :rules="usernameRules"
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
                            color="success"
                            class="mr-4"
                            @click="validateRegister"
                        >
                            Validate
                        </v-btn>
                    </v-form>
                </div>
            </v-container>
        </v-sheet>

        <v-list shaped>
            <router-link :to="{ name: 'home' }">
                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title> Home </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>
            <router-link :to="{ name: 'example' }">
                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title> Example </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>
            <router-link :to="{ name: 'rien' }">
                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title> Rien </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import axios from "axios";

export default {
    name: "left-drawer-layout",
    data() {
        return {
            user: null,
            loginValid: true,
            registerValid: true,
            loginForm: false,
            registerForm: false,
            username: "",
            usernameRegister: "",
            password: "",
            passwordRegister: "",
            emailRegister: "",
            show1: false,
            show2: false,
            usernameRules: [
                (value) => !!value || "Required.",
                (v) =>
                    (v && v.length <= 10) ||
                    "Name must be less than 10 characters",
            ],
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
    created() {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            this.getUser();
        });
    },
    methods: {
        logout: function () {
            axios.post("/logout").then((Response) => {
                location.reload();
            });
        },
        toggleLogin: function () {
            this.loginForm = !this.loginForm;
        },
        toggleRegister: function () {
            this.registerForm = !this.registerForm;
        },
        getUser() {
            axios.get("/api/user").then((Response) => {
                this.user = Response.data;
            });
        },
        validateLogin() {
            if (this.$refs.loginForm.validate()) {
                axios
                    .post("/login", {
                        name: this.username,
                        password: this.password,
                    })
                    .then((Response) => {
                        this.getUser();
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
                        console.log(Response);
                        // TODO: faut refresh les cookies entre 2 inscriptions sinon la deuxième ne marche pas
                        if (Response.status == 201) {
                            alert("account created");
                        }
                    });
            }
        },
    },
};
</script>

<style></style>
