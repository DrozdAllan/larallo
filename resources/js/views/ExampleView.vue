<template>
    <v-container>
        <h1 class="text-center">Private channels</h1>
        <p class="text-center">Work in progress</p>
        <h1>coucou zinzin y a rien</h1>
        <h2>{{ count }}</h2>
        <v-btn @click="$store.commit('INCREMENT')"> INCREMENT </v-btn>
    </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState({
            count: (state) => state.count,
        }),
    },
};
</script>
