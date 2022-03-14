<template>
    <v-navigation-drawer app clipped right>
        <div v-if="user" class="text-center">
            There are {{ users.length }} users online
            <v-list>
                <v-list-item v-for="(user, index) in users" :key="index" link>
                    <v-list-item-content>
                        <v-list-item-title> {{ user.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
        <div v-else class="text-center">
            You need to be connected to see online users
        </div>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "right-drawer-layout",
    data() {
        return {
            user: null,
            users: [],
        };
    },
    created() {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            this.getUser();
        });
    },
    methods: {
        getUser() {
            axios.get("/api/user").then((Response) => {
                this.user = Response.data;
            });
        },
    },
    mounted: function () {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        Echo.join("online")
            .here((users) => (this.users = users))
            .joining((user) => this.users.push(user))
            .leaving(
                (user) =>
                    (this.users = this.users.filter((u) => u.id !== user.id))
            );
    },
};
</script>

<style></style>
