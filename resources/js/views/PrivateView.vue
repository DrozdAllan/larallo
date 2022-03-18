<template>
  <v-container>
    <h2 class="text-center primary--text py-3">Private channels</h2>
    <p class="text-center">Work in progress</p>

    <span v-if="!isConnected">
      You must be connected to use private channels    </span>
    <v-container v-else>
      <v-form

          v-if="!messageForm"
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
      <v-container v-if="messageForm">

        <v-form
            ref="messageForm"
            v-model="messageValid"
            :rules="messageRules"
            lazy-validation
        >
          <v-text-field
              v-model="message"
              :counter="10"
              :label="'send a message to the channel ' + this.channelName"
              required
          ></v-text-field>
          <v-btn large outlined color="error" @click="stopChannel">
            Stop listening to this channel
          </v-btn>
          <v-btn
              large
              outlined
              color="primary"
              class="mr-4"
              @click="validateMessageForm"
          >
            Validate
          </v-btn>
        </v-form>
        <div>
          <ul>
            <li
                v-for="(message, index) in messages"
                :key="index"
                class="py-1"
            >
              ({{ message.date }})
              <b
                  v-if="user != null"
                  :class="
                            message.username === user.name ? 'primary--text' : ''
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
      messageForm: false,
      messageValid: true,
      message: '',
      channelNameRules: [
        value => !!value || "Required."
      ],
      messageRules: [
        value => !!value || "Required."
      ]
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
        this.messageForm = true;
        this.connectToChannel();
      }
    },
    validateMessageForm() {
      if (this.$refs.messageForm.validate()) {
        axios.post("/privateChannel", {
          channelName: this.channelName,
          message: this.message,
        })
        this.message = '';
      }
    },
    connectToChannel() {
      Echo.private(this.channelName).listen("PrivateMessageEvent", (data) => {
        this.messages.push(data);
      });
    },
    stopChannel() {
      Echo.leaveChannel(this.channelName);
      this.channelName = '';
      this.messageForm = false;
      this.messages = null;
    }
  }
}

</script>
