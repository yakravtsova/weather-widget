import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState, Weather, City } from "./types";
import axios from "axios";

Vue.use(Vuex);

const baseUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=5b5354f08b947e045f34636102f4457f&";
const iconPath = "http://openweathermap.org/img/wn/";
const iconExtension = "@2x.png";

const degToCompass = (deg: number) => {
  const val: number = Math.floor(deg / 22.5 + 0.5);
  const arr: string[] = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

const getWeather = (data: any): Weather => {
  const cloudsData = data.weather[0].description;
  const formattedCloudsData =
    cloudsData.charAt(0).toUpperCase() + cloudsData.slice(1);
  return {
    city: data.name,
    country: data.sys.country,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windDirection: degToCompass(data.wind.deg),
    clouds: formattedCloudsData,
    visibility: data.visibility,
    iconUrl: `${iconPath}${data.weather[0].icon}${iconExtension}`,
    order: 0,
  };
};

const store: StoreOptions<RootState> = {
  state: {
    weatherData: [],
    cities: [],
    isGeoOn: false,
    isData: true,
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
  },
  mutations: {
    SET_IS_GEO_ON(state, status) {
      state.isGeoOn = status;
    },

    SET_IS_DATA(state, status) {
      state.isData = status;
    },

    SET_CITIES(state, cities) {
      state.cities = cities;
    },

    ADD_CITIES(state, city) {
      if (state.cities === null) {
        state.cities = [];
      }
      if (!state.cities.find((c) => c.city === city)) {
        const cityObj: City = { city: city, order: state.cities.length };
        state.cities.push(cityObj);
        localStorage.setItem("cities", JSON.stringify(state.cities));
      } else return;
    },

    SET_WEATHER_DATA(state, weatherData) {
      state.weatherData = weatherData;
    },

    ADD_WEATHER_DATA(state, weatherData) {
      state.weatherData = [...state.weatherData, weatherData];
      //state.weatherData.push(weatherData);
    },

    REMOVE_CITY_WEATHER_DATA(state, city) {
      console.log(city);
      state.weatherData = state.weatherData.filter((w) => w.city !== city);
      state.weatherData.forEach(
        (w) => (w.order = state.weatherData.indexOf(w))
      );
    },
  },
  actions: {
    setIsGeoOn({ commit }, status) {
      commit("SET_IS_GEO_ON", status);
    },

    setIsData({ commit }, status) {
      commit("SET_IS_DATA", status);
    },

    setCities({ commit }, cities) {
      commit("SET_CITIES", cities);
    },

    removeCity({ commit, state }, city) {
      commit("REMOVE_CITY_WEATHER_DATA", city);
      state.cities = state.weatherData.map((w) => {
        return { city: w.city, order: w.order };
      });
      localStorage.setItem("cities", JSON.stringify(state.cities));
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
          console.log("jkjkj");
          const result: Weather = getWeather(res.data);
          result.order = state.weatherData.length;
          commit("ADD_CITIES", result.city);
          commit("ADD_WEATHER_DATA", result);
        })
        .catch(function (error) {
          commit("SET_IS_DATA", false);
          if (error.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который
            // выходит за пределы 2xx
            console.log(error.response.data);
          } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            console.log(error.request);
          } else {
            // Произошло что-то при настройке запроса, вызвавшее ошибку
            console.log("Error", error.message);
          }
        });
    },

    async getAllWeatherData({ commit, state }) {
      for (const c of state.cities) {
        const q = { q: c.city };
        const searchString = new URLSearchParams(q).toString();
        await axios(`${baseUrl}${searchString}`)
          .then((res) => {
            commit("SET_IS_DATA", true);
            commit("SET_IS_GEO_ON", true);
            const result: Weather = getWeather(res.data);
            result.order = state.cities.indexOf(c);
            commit("ADD_WEATHER_DATA", result);
          })
          .catch(function (error) {
            commit("SET_IS_DATA", false);
            if (error.response) {
              // Запрос был сделан, и сервер ответил кодом состояния, который
              // выходит за пределы 2xx
              console.log(error.response.data);
            } else if (error.request) {
              // Запрос был сделан, но ответ не получен
              // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
              // http.ClientRequest в node.js
              console.log(error.request);
            } else {
              // Произошло что-то при настройке запроса, вызвавшее ошибку
              console.log("Error", error.message);
            }
          });
      }
    },
  },

  modules: {},
};

export default new Vuex.Store<RootState>(store);
