<template>
  <v-container class="zinzin">
    <h2 class="text-center primary--text py-3">Main Channel</h2>
    <div v-if="user != null">
      <ul class="px-0 px-lg-10">
        <li
            v-for="(message, index) in messages"
            :key="index"
            class="py-1"
            :class="message.username === user.name ? 'text-right' : 'text-left'">
          ({{ message.date }})
          <b :class="message.username === user.name ? 'primary--text' : ''">
            {{ message.username }} </b>
          : {{ message.message }}
        </li>
      </ul>
    </div>
    <div v-else>
      <ul class="px-0 px-lg-10">
        <li
            v-for="(message, index) in messages"
            :key="index"
            class="py-1">
          ({{ message.date }})
          <b> {{ message.username }} </b>
          : {{ message.message }}
        </li>
      </ul>
    </div>
    <footer-layout/>
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

    Echo.channel("MainChannel").listen("ChatMessageEvent", (data) => {
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
.zinzin {
  word-break: break-word;
}
ul {
  list-style: none;
}
</style>
