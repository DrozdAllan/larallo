<template>
    <v-container>
        <h1 class="text-center primary--text">Main Channel</h1>
        <div>
            <ul>
                <li v-for="(message, index) in messages" :key="index">
                    <b>{{ message.username }}</b> : {{ message.message }}
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
};
</script>

<style>
ul {
    list-style: none;
}
</style>
