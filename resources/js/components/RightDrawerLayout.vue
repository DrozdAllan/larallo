<template>
    <v-navigation-drawer app clipped right>
        <v-list>
            <v-list-item v-for="n in 5" :key="n" link>
                <v-list-item-content>
                    <v-list-item-title>Online user's username</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'right-drawer-layout'
};
</script>

<style></style>
