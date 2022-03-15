<template>
    <v-app>
        <!-- <system-bar-layout /> -->

        <app-bar-layout />

        <left-drawer-layout />

        <right-drawer-layout />

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import AppBarLayout from "./components/AppBarLayout.vue";
import LeftDrawerLayout from "./components/LeftDrawerLayout.vue";
import RightDrawerLayout from "./components/RightDrawerLayout.vue";
import SystemBarLayout from "./components/SystemBarLayout.vue";
export default {
    components: {
        SystemBarLayout,
        AppBarLayout,
        LeftDrawerLayout,
        RightDrawerLayout,
    },
    data() {
        return {
            drawer: null,
        };
    },
    created() {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            this.$store.dispatch("connectUser");
        });
    },
};
</script>

<style></style>
