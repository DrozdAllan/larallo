<template>
    <v-navigation-drawer v-model="drawer" app>
        <v-sheet color="grey lighten-5" height="128" width="100%">
            <v-container class="justify-center text-center">
                <h2>Logged in as</h2>
                <v-btn>Login</v-btn>
                <v-btn>Register</v-btn>
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
export default {
    name: "left-drawer-layout",
};
</script>

<style></style>
