import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl:
      "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&appid=5b5354f08b947e045f34636102f4457f&",
    iconPath: "http://openweathermap.org/img/wn/",
    iconExtension: "@2x.png",
    weatherData: {},
    cities: [],
  },
  getters: {
    CITIES(state) {
      return state.cities;
    },
    WEATHER_DATA(state) {
      return state.weatherData;
    },
  },
  mutations: {
    SET_CITIES(state, cities) {
      state.cities = cities;
    },

    ADD_CITIES(state, city) {
      if (state.cities === null) {
        state.cities = [];
      }
      if (!state.cities.includes(city)) {
        state.cities.push(city);
        localStorage.setItem("cities", JSON.stringify(state.cities));
      } else return;
    },

    REMOVE_CITY(state, city) {
      state.cities = state.cities.filter((c) => c !== city);
      localStorage.setItem("cities", JSON.stringify(state.cities));
    },

    SET_WEATHER_DATA(state, weatherData) {
      state.weatherData = weatherData;
    },

    ADD_WEATHER_DATA(state, weatherData) {
      state.weatherData = {
        ...state.weatherData,
        [weatherData.city]: weatherData,
      };
    },

    REMOVE_CITY_WEATHER_DATA(state, city) {
      Vue.delete(state.weatherData, city);
    },
  },
  actions: {
    setCities({ commit }, cities) {
      commit("SET_CITIES", cities);
    },

    removeCity({ commit }, city) {
      commit("REMOVE_CITY", city);
      commit("REMOVE_CITY_WEATHER_DATA", city);
    },

    getWeatherData({ commit, state }, query) {
      const result = {};
      const searchString = new URLSearchParams(query).toString();
      fetch(`${state.baseUrl}${searchString}`)
        .then((res) => res.json())
        .then((data) => {
          result.city = data.name;
          result.temp = data.main.temp;
          result.weather = data.weather[0].main;
          result.iconUrl = `${state.iconPath}${data.weather[0].icon}${state.iconExtension}`;
          commit("ADD_CITIES", data.name);
          commit("ADD_WEATHER_DATA", result);
        })
        .catch((e) => console.log(e));
    },

    getAllWeatherData({ commit, state }) {
      state.cities.forEach((city) => {
        const q = { q: city };
        const result = {};
        const searchString = new URLSearchParams(q).toString();
        fetch(`${state.baseUrl}${searchString}`)
          .then((res) => res.json())
          .then((data) => {
            result.city = data.name;
            result.temp = data.main.temp;
            result.weather = data.weather[0].main;
            result.iconUrl = `${state.iconPath}${data.weather[0].icon}${state.iconExtension}`;
            commit("ADD_WEATHER_DATA", result);
          })
          .catch((e) => console.log(e));
      });
    },
  },
  modules: {},
});
