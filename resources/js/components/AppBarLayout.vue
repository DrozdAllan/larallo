<template>
    <v-app-bar app clipped-right flat height="72">
        <!-- <v-spacer></v-spacer> -->
        <v-container>
            <span>
                You can use the main channel without logging in, user1 and
                user2 are available with the password "password" to see users online<br />
                No messages are registered in database
            </span>
        </v-container>

        <!-- <v-responsive max-width="156">
            <v-text-field
                dense
                flat
                hide-details
                rounded
                solo-inverted
                label="Online User"
            />
        </v-responsive> -->
    </v-app-bar>
</template>

<script>
export default {
    name: "app-bar-layout",
};
</script>

<style></style>
