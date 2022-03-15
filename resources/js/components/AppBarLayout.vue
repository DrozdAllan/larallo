<template>
    <v-app-bar app clipped-left clipped-right dense color="appBar">
        <v-col cols="2" class="py-0">
            <v-app-bar-nav-icon
                color="primary"
                class="pa-0 hidden-lg-and-up"
                @click="openDrawer()"
            >
            </v-app-bar-nav-icon>
        </v-col>
        <v-col cols="8" class="px-0 text-subtitle-2 text-center">
            <span v-if="!this.$vuetify.breakpoint.xs">
                Note : you can use the main channel without logging in, user1
                and user2 are available with the password "password" to see
                users online.
            </span>
            <span v-else>
                <v-dialog v-model="dialog">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            text
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            color="primary"
                            >Note</v-btn
                        >
                    </template>

                    <v-card @click="dialog = false">
                        <v-card-text class="pa-2">
                            You can use the main channel without logging in,
                            user1 and user2 are available with the password
                            "password" to see users online.
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </span>
        </v-col>
        <v-col cols="2" class="py-0">
            <v-btn
                icon
                color="primary"
                class="pa-0 hidden-lg-and-up"
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
    data() {
        return {
            dialog: false,
        };
    },
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
