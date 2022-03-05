<template>
    <v-app>
        <system-bar-layout />

        <app-bar-layout />

        <left-drawer-layout />

        <right-drawer-layout />

        <v-main>
            <router-view />
        </v-main>

        <footer-layout />
    </v-app>
</template>

<script>
import AppBarLayout from "./components/AppBarLayout.vue";
import FooterLayout from "./components/FooterLayout.vue";
import LeftDrawerLayout from "./components/LeftDrawerLayout.vue";
import RightDrawerLayout from "./components/RightDrawerLayout.vue";
import SystemBarLayout from "./components/SystemBarLayout.vue";
export default {
    components: {
        SystemBarLayout,
        AppBarLayout,
        LeftDrawerLayout,
        RightDrawerLayout,
        FooterLayout,
    },
    data() {
        return {
            drawer: null,
        };
    },
};
</script>

<style></style>
