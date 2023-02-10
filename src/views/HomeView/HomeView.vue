<template>
  <div class="weather-board">
    <button @click="handleSettingsOpen" class="weather-board__button">
      <i class="icon fa-solid fa-gear"></i>
    </button>
    <p class="weather-board__error" v-if="!isGeoOn || !cities.length">
      {{ errorMessage }}
    </p>
    <ul v-else class="weather-board__list">
      <li v-for="w in weatherData" :key="w.order">
        <WeatherVue v-bind:w="w" />
        {{ w.id }}
      </li>
    </ul>

    <SettingsVue v-if="isSettingsOpened" />
  </div>
</template>

<script>
import SettingsVue from "@/components/SettingsVue/SettingsVue.vue";
import WeatherVue from "@/components/WeatherVue/WeatherVue.vue";

export default {
  name: "HomeView",
  data() {
    return {
      isSettingsOpened: false,
      noGeoMessage:
        "Geolocation is not available. Please, click the gear icon to add a location.",
      noDataMessage: "Failed to get data. Please,try again later",
      emptyListMessage:
        "The list of cities is empty. Please, click the gear icon to add a location.",
      otherErrorMessage: "Service is not available.",
    };
  },
  components: {
    WeatherVue,
    SettingsVue,
  },
  computed: {
    cities() {
      return this.$store.getters.CITIES;
    },
    weatherData() {
      return this.$store.getters.WEATHER_DATA;
    },
    isGeoOn() {
      return this.$store.getters.IS_GEO_ON;
    },
    isData() {
      return this.$store.getters.IS_DATA;
    },
    isAdded() {
      return this.$store.getters.IS_ADDED;
    },
    errorMessage() {
      if (!this.isGeoOn) {
        return this.noGeoMessage;
      }
      if (!this.cities.length) {
        return this.emptyListMessage;
      } else return this.otherErrorMessage;
    },
  },
  methods: {
    setQuery(pos) {
      return { lat: pos.coords.latitude, lon: pos.coords.longitude };
    },
    getLocalWeatherData(pos) {
      const query = this.setQuery(pos);
      this.$store.dispatch("getWeatherData", query);
      this.$store.dispatch("setIsGeoOn", true);
    },

    handleSettingsOpen() {
      this.isSettingsOpened = !this.isSettingsOpened;
      this.$store.dispatch("setIsData", true);
      this.$store.dispatch("setIsAdded", true);
      const icon = document.querySelector(".icon");
      icon.classList.add(this.isSettingsOpened ? "fa-xmark" : "fa-gear");
    },
  },
  async created() {
    let citiesArr = JSON.parse(localStorage.getItem("cities"));
    if (citiesArr !== null) {
      this.$store.dispatch("setCities", citiesArr);
      await this.$store.dispatch("getAllWeatherData");
    } else {
      navigator.geolocation.getCurrentPosition(this.getLocalWeatherData, () =>
        this.$store.dispatch("setIsGeoOn", false)
      );
    }
  },
};
</script>

<style>
@import "./HomeView.css";
</style>
