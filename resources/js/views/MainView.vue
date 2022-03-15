<template>
    <v-container>
        <h2 class="text-center primary--text py-3">Main Channel</h2>
        <div>
            <ul>
                <li
                    v-for="(message, index) in messages"
                    :key="index"
                    class="py-1"
                >
                    <b
                        v-if="user != null"
                        :class="
                            message.username == user.name ? 'primary--text' : ''
                        "
                    >
                        {{ message.username }}</b
                    >
                    <b v-else>
                        {{ message.username }}
                    </b>
                    : {{ message.message }}
                </li>
            </ul>
        </div>
        <footer-layout />
    </v-container>
</template>

<script>
import FooterLayout from "../components/FooterLayout.vue";

export default {
    components: {
        FooterLayout,
    },
    data() {
        return {
            messages: [],
        };
    },
    mounted() {
        // TODO: Enable pusher logging - don't include this in production
        // Pusher.logToConsole = true;

        var channel = Echo.channel("MainChannel");
        channel.listen("ChatMessageEvent", (data) => {
            this.messages.push(data);
        });
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
};
</script>

<style>
ul {
    list-style: none;
}
</style>
