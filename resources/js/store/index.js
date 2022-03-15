import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isConnected: false,
        user: null,
        drawer: null,
        onlineUsers: null,
    },
    getters: {
        isConnected(state) {
            return state.isConnected;
        },
        user(state) {
            return state.user;
        },
        drawer(state) {
            return state.drawer;
        },
        onlineUsers(state) {
            return state.onlineUsers;
        },
    },
    mutations: {
        setIsConnected(state, payload) {
            state.isConnected = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setDrawer(state, payload) {
            state.drawer = payload;
        },
        setOnlineUsers(state, payload) {
            state.onlineUsers = payload;
        },
    },
    actions: {
        connectUser({ commit }) {
            axios.get("/api/user").then((Response) => {
                commit("setUser", Response.data);
                commit("setIsConnected", true);
            });
        },
        updateDrawer({ commit }, event) {
            commit("setDrawer", event);
        },
        updateOnlineUsers({ commit }, event) {
            commit("setOnlineUsers", event);
        },
    },
});

export default store;
