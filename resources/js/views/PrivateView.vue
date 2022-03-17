<template>
  <v-container>
    <h2 class="text-center primary--text py-3">Private channels</h2>
    <p class="text-center">Work in progress</p>

    <v-form
        ref="channelForm"
        v-model="channelValid"
        lazy-validation
    >
      <v-text-field
          v-model="channelName"
          :counter="10"
          :rules="channelNameRules"
          label="Private Channel Name"
          required
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
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      channelValid: false,
      channelName: '',
      channelNameRules: [
        value => !!value || "Required."
      ]
    }
  },
  methods: {
    validateForm() {
      if (this.$refs.channelForm.validate()) {
        axios.post("/newChannel", {
          channelName: this.channelName,
        })
      }
    }
  }
}

</script>
