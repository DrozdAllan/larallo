<template>
    <v-footer app color="transparent" height="72" inset>
        <v-row dense>
            <v-text-field
                background-color="grey lighten-3"
                flat
                rounded
                filled
                v-model="message"
                append-outer-icon="mdi-send"
                @click:append-outer="sendMsg()"
                @keydown.enter="sendMsg()"
                label="Enter your message (do not send private data)"
            ></v-text-field>
        </v-row>
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
