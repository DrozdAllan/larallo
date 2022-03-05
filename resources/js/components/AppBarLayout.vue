<template>
    <v-app-bar app clipped-right flat height="72">
        <v-spacer></v-spacer>

        <v-responsive max-width="156">
            <v-text-field dense flat hide-details rounded solo-inverted label="Online User" />
        </v-responsive>
    </v-app-bar>
</template>

<script>
export default {
    name: "app-bar-layout",
};
</script>

<style></style>
