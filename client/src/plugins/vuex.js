import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: undefined,
        token: undefined,
    },
    mutations: {
        setUser(state, userObj) {
            state.user = userObj;
        },
        setToken(state, token) {
            state.token = token;
        }
    },
    plugins: [createPersistedState()]
})

export default store;