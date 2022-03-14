<template>
    <v-footer app color="transparent" height="72" inset>
        <v-text-field
            background-color="grey lighten-1"
            dense
            flat
            hide-details
            rounded
            solo
            v-model="message"
        ></v-text-field>
        <v-btn @click="sendMsg()">send</v-btn>
    </v-footer>
</template>

<script>
export default {
    name: "footer-layout",
    data() {
        return {
            message: "",
        };
    },
    methods: {
        sendMsg() {
            axios.post("/msg", {
                message: this.message,
            });
            this.message = "";
        },
    },
};
</script>

<style></style>
