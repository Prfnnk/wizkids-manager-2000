import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";
import { draftData } from "../assets/data/draft";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wizkidsData: draftData,
    isWizkid: false,
  },
  getters: {},

  mutations: {
    setWData(state, content) {
      state.wizkidsData = content;
    },
    setNewData(state, content) {
      const newData = state.wizkidsData.map((item, index) => {
        if (content.index === index) {
          return {
            ...item,
            name: content.name,
            role: content.role,
            email: content.email,
            phone: content.phone,
          };
        }
        return item;
      });

      state.wizkidsData = newData;
    },

    deleteWizkid(state, id) {
      const filteredData = state.wizkidsData.filter((item) => item.id !== id);

      state.wizkidsData = filteredData;
    },

    manageWizkid(state, content) {
      const newData = state.wizkidsData.map((item, index) => {
        if (content.index === index) {
          return {
            ...item,
            fired: content.isFired,
          };
        }
        return item;
      });

      state.wizkidsData = newData;
    },

    addNewItem(state) {
      const newData = [
        ...state.wizkidsData,
        {
          name: "",
          phone: "",
          email: "",
          role: "Developer",
          id: uuidv4(),
        },
      ];

      state.wizkidsData = newData;
    },

    setIsWizkid(state, value) {
      state.isWizkid = value;
    },
  },

  actions: {
    setWData(context, content) {
      context.commit("setWData", content);
    },

    setNewData({ commit }, content) {
      commit("setNewData", content);
    },

    deleteWizkid({ commit }, id) {
      commit("deleteWizkid", id);
    },

    manageWizkid({ commit }, content) {
      commit("manageWizkid", content);
    },
    addNewItem({ commit }) {
      commit("addNewItem");
    },
    setIsWizkid({ commit }, value) {
      commit("setIsWizkid", value);
    },
  },
  modules: {},
});
