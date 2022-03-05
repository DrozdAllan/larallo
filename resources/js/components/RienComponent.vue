<template>
    <div>
        <h1>coucou zinzin y a rien</h1>
        <h2>{{ count }}</h2>
        <button class="btn" @click="$store.commit('INCREMENT')">
            INCREMENT
        </button>
    </div>
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

<style></style>
