<template>
    <v-container>
        <h1 class="text-center">Main Channel</h1>
        <p class="text-center">
            This channel is public, don't send private data
        </p>
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
    mounted: function () {
        // TODO: Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        var channel = Echo.channel("my-channel");
        channel.listen(".my-event", (data) => {
            this.messages.push(data);
            // console.log(members.count);
        });
    },
};
</script>

<style>
ul {
    list-style: none;
}
</style>
