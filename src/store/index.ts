import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState, Weather, City } from "./types";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { getWeather } from "../utils/utils";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    weatherData: [],
    cities: [],
    isGeoOn: true,
    isData: true,
    isAdded: true,
    isAvailable: true,
  },
  getters: {
    CITIES(state) {
      return state.cities;
    },
    WEATHER_DATA(state) {
      return state.weatherData;
    },
    IS_GEO_ON(state) {
      return state.isGeoOn;
    },
    IS_DATA(state) {
      return state.isData;
    },
    IS_ADDED(state) {
      return state.isAdded;
    },
    IS_AVAILABLE(state) {
      return state.isAvailable;
    },
  },
  mutations: {
    SET_IS_GEO_ON(state, status) {
      state.isGeoOn = status;
    },

    SET_IS_DATA(state, status) {
      state.isData = status;
    },

    SET_IS_ADDED(state, status) {
      state.isAdded = status;
    },

    SET_IS_AVAILABLE(state, status) {
      state.isAvailable = status;
    },

    SET_CITIES(state, cities) {
      state.cities = cities;
    },

    ADD_CITIES(state, cityObj) {
      state.cities.push(cityObj);
      localStorage.setItem("cities", JSON.stringify(state.cities));
    },

    SET_WEATHER_DATA(state, weatherData) {
      state.weatherData = weatherData;
    },

    ADD_WEATHER_DATA(state, weatherData) {
      if (!state.weatherData.find((w) => w.city === weatherData.city)) {
        state.weatherData = [...state.weatherData, weatherData];
      } else return;
    },

    REMOVE_CITY_WEATHER_DATA(state, city) {
      state.weatherData = state.weatherData.filter((w) => w.city !== city);
      state.weatherData.forEach(
        (w) => (w.order = state.weatherData.indexOf(w))
      );
    },
  },
  actions: {
    setIsSettingsOpened({ commit }) {
      commit("SET_IS_SETTINGS_OPENED");
    },

    setIsGeoOn({ commit }, status) {
      commit("SET_IS_GEO_ON", status);
    },

    setIsData({ commit }, status) {
      commit("SET_IS_DATA", status);
    },

    setIsAdded({ commit }, status) {
      commit("SET_IS_ADDED", status);
    },

    setCities({ commit }, cities) {
      commit("SET_CITIES", cities);
    },

    removeCity({ commit, state }, city) {
      commit("REMOVE_CITY_WEATHER_DATA", city);
      state.cities = state.weatherData.map((w) => {
        return { city: w.city, order: w.order };
      });
      state.cities.length === 0
        ? localStorage.removeItem("cities")
        : localStorage.setItem("cities", JSON.stringify(state.cities));
      commit("SET_CITIES", state.cities);
    },

    setWeatherData({ commit }, weatherData) {
      commit("SET_WEATHER_DATA", weatherData);
    },

    setOrder({ commit, state }) {
      state.weatherData.forEach((w) => {
        w.order = state.weatherData.indexOf(w);
      });
      state.cities = state.weatherData.map((w) => {
        return { city: w.city, order: w.order };
      });
      localStorage.setItem("cities", JSON.stringify(state.cities));
      commit("SET_CITIES", state.cities);
    },

    async getWeatherData({ commit, state }, query) {
      const searchString = new URLSearchParams(query).toString();
      await axios(`${baseUrl}${searchString}`)
        .then((res) => {
          commit("SET_IS_DATA", true);
          commit("SET_IS_GEO_ON", true);
          if (!state.cities.find((c) => c.city === res.data.name)) {
            const result: Weather = getWeather(res.data);
            result.order = state.weatherData.length;
            const cityObj: City = {
              city: result.city,
              order: state.cities.length,
            };
            commit("SET_IS_ADDED", true);
            commit("ADD_CITIES", cityObj);
            commit("ADD_WEATHER_DATA", result);
          } else {
            commit("SET_IS_ADDED", false);
            commit("SET_IS_DATA", true);
          }
        })
        .catch(function (error) {
          commit("SET_IS_DATA", false);
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },

    async getAllWeatherData({ commit, state }) {
      for (const c of state.cities) {
        const q = { q: c.city };
        const searchString = new URLSearchParams(q).toString();
        let result: Weather = {
          city: c.city,
          country: "",
          temp: 0,
          feelsLike: 0,
          pressure: 0,
          humidity: 0,
          windSpeed: 0,
          windDirection: "",
          clouds: "",
          visibility: 0,
          iconUrl: "",
          dewPoint: 0,
          daylight: 0,
          isOk: false,
          order: c.order,
        };
        await axios(`${baseUrl}${searchString}`)
          .then((res) => {
            commit("SET_IS_DATA", true);
            commit("SET_IS_GEO_ON", true);
            result = getWeather(res.data);
            result.isOk = true;
            result.order = c.order;
            commit("ADD_WEATHER_DATA", result);
          })
          .catch(function (error) {
            result.isOk = false;
            commit("ADD_WEATHER_DATA", result);
            commit("SET_IS_DATA", false);
            if (error.response) {
              console.log(error.response.data);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
          });
      }
    },
  },

  modules: {},
};

export default new Vuex.Store<RootState>(store);
