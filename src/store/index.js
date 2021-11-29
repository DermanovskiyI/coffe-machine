import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deposit: 0,
    machineCash: [
      {
        id: 0,
        val: 1,
        rest: 101,
      },
      {
        id: 1,
        val: 2,
        rest: 102,
      },
      {
        id: 3,
        val: 5,
        rest: 1,
      },
      {
        id: 4,
        val: 10,
        rest: 2,
      },
    ],
  },
  mutations: {
    SET_DEPOSIT(state, payload) {
      state.deposit += payload;
    },

    SET_DEPOSIT_AFTER_CHANGE(state) {
      state.deposit = 0;
    },

    SET_CHANGE(state, payload) {
      state.deposit -= payload;
    },

    SET_MACHINECASH_AFTER_CHANGE(state, payload) {
      state.machineCash.forEach((item) => {
        if (item.val === payload.val) {
          item.rest -= payload.rest;
        }
      });
    },
  },

  getters: {
    getDeposit: (state) => state.deposit,
    machineCash: (state) => state.machineCash,
  },

  actions: {},
  modules: {},
});
