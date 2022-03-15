<template>
    <v-navigation-drawer
        app
        clipped
        right
        :value="onlineUsers"
        @input="checkInput($event)"
    >
        <div v-if="user" class="text-center">
            <span v-if="users.length == 1"> There is </span>
            <span v-else> There are </span>
            <span class="primary--text font-weight-bold">
                {{ users.length }}
            </span>
            user<span v-if="users.length > 1">s</span>
            online
            <v-list>
                <v-list-item v-for="(user, index) in users" :key="index" link>
                    <v-list-item-content>
                        <v-list-item-title
                            class="primary--text font-weight-bold"
                        >
                            {{ user.name }}</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
        <div v-else class="text-center">You must login to see online users</div>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "right-drawer-layout",
    data() {
        return {
            // user: voir le computed user(),
            users: [],
        };
    },
    mounted() {
        // TODO: Enable pusher logging - don't include this in production
        // Pusher.logToConsole = true;
        Echo.join("online")
            .here((users) => (this.users = users))
            .joining((user) => this.users.push(user))
            .leaving(
                (user) =>
                    (this.users = this.users.filter((u) => u.id !== user.id))
            );
    },
    computed: {
        user() {
            if (this.$store.getters.isConnected) {
                return this.$store.getters.user;
            } else {
                return null;
            }
        },
        onlineUsers() {
            return this.$store.getters.onlineUsers;
        },
    },
    methods: {
        checkInput(event) {
            this.$store.dispatch("updateOnlineUsers", event);
        },
    },
};
</script>
