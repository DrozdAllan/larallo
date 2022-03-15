<template>
    <v-app-bar app clipped-right flat>
        <v-col cols="2" class="py-0">
            <v-app-bar-nav-icon
                color="primary"
                class="pa-0 hidden-md-and-up"
                @click="openDrawer()"
            >
            </v-app-bar-nav-icon>
        </v-col>
        <v-col
            cols="8"
            class="px-0 text-caption text-md-subtitle-2 text-center"
        >
            You can use the main channel without logging in, user1 and user2 are
            available with the password "password" to see users online.
        </v-col>
        <v-col cols="2" class="py-0">
            <v-btn
                icon
                color="primary"
                class="pa-0 hidden-md-and-up"
                @click="openOnlineUsers()"
            >
                <v-icon>mdi-account-circle</v-icon>
            </v-btn>
        </v-col>

        <!-- <v-responsive max-width="156">
            <v-text-field
                dense
                flat
                hide-details
                rounded
                solo-inverted
                label="Online User"
            />
        </v-responsive> -->
    </v-app-bar>
</template>

<script>
export default {
    name: "app-bar-layout",
    methods: {
        openDrawer() {
            this.$store.dispatch("updateDrawer", true);
        },
        openOnlineUsers() {
            this.$store.dispatch("updateOnlineUsers", true);
        },
    },
};
</script>

<style></style>
