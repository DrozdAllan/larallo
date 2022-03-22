<template>
  <v-container class="zinzin">
    <h2 class="text-center primary--text py-3">Private channels</h2>
    <v-container class="text-center" v-if="messageField">
      <v-btn small outlined color="error" @click="stopChannel" class="no-uppercase">
        Stop listening to {{ channelName }}
      </v-btn>
    </v-container>
    <v-container v-if="!isConnected" class="text-center">
      You must be connected to use private channels
    </v-container>
    <v-container v-else>
      <v-row justify="center">
        <v-col cols="6" class="text-center">
          <v-form

              v-if="!messageField"
              ref="channelForm"
              v-model="channelValid"
              lazy-validation
          >
            <v-text-field
                v-model="channelName"
                :counter="10"
                :rules="channelNameRules"
                label="Select the channel name you want to listen"
                required
                @keydown.space.prevent
                @keydown.enter="validateForm"
            ></v-text-field>
            <v-btn
                :disabled="!channelValid"
                large
                outlined
                color="primary"
                class="mr-4"
                @click="validateForm"
            >
              Validate
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-container v-if="messageField">
        <v-footer ref="messageField" app color="transparent" height="72" inset>
          <v-row dense>
            <v-text-field
                background-color="grey lighten-3"
                flat
                rounded
                filled
                v-model="message"
                append-outer-icon="mdi-send"
                @click:append-outer="sendMessage"
                @keydown.enter="sendMessage"
                :label="'Enter your message to ' + this.channelName + ' (do not send private data)'"
            ></v-text-field>
          </v-row>
        </v-footer>
        <div>
          <ul class="px-0 px-lg-10">
            <li
                v-for="(message, index) in messages"
                :key="index"
                class="py-1"
                :class="message.username === user.name ? 'text-right' : 'text-left'">
              ({{ message.date }})
              <b v-if="user != null"
                 :class="message.username === user.name ? 'primary--text' : ''">
                {{ message.username }} </b>
              <b v-else>
                {{ message.username }}
              </b>
              : {{ message.message }}
            </li>
          </ul>
        </div>
      </v-container>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      channelValid: false,
      channelName: '',
      messageField: false,
      message: '',
      channelNameRules: [
        value => !!value || "Required.",
        value => /^[A-z\d]*$/.test(value) || 'Channel name is invalid',
      ],
    }
  },
  computed: {
    isConnected() {
      return this.$store.getters.isConnected;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    validateForm() {
      if (this.$refs.channelForm.validate()) {
        this.messageField = true;
        this.connectToChannel();
      }
    },
    sendMessage() {
      axios.post("/privateChannel", {
        channelName: this.channelName,
        message: this.message,
      })
      this.message = '';
    },
    connectToChannel() {
      Echo.private(this.channelName).listen("PrivateMessageEvent", (data) => {
        this.messages.push(data);
      });
    },
    stopChannel() {
      Echo.leaveChannel(this.channelName);
      this.channelName = '';
      this.messageField = false;
      this.messages = null;
    }
  }
}

</script>

<style>
.zinzin {
  word-break: break-word;
}

.no-uppercase {
  text-transform: unset !important;
}

ul {
  list-style: none;
}
</style>