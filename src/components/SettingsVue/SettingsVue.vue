<template>
  <div class="settings">
    <div class="settings__container">
      <draggable
        tag="ul"
        :list="weatherData"
        handle=".handle"
        @change="updateOrderMethod"
        class="settings__list"
      >
        <li
          class="settings__city-container"
          v-for="w in weatherData"
          :key="w.city"
        >
          <i class="fa-solid fa-bars handle"></i>
          <CityVue v-bind:c="w" />
        </li>
      </draggable>
      <form class="settings__form" role="search" @submit="search">
        <label class="settings__label" for="search-input">Add location:</label>
        <div class="settings__form-container">
          <input
            id="search-input"
            class="settings__input"
            type="text"
            placeholder="New York"
            aria-label="Search"
            v-model="query"
          />
          <button class="settings__button" type="submit">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <span
          v-if="!isData || !isAdded || isQueryError"
          class="settings__error"
          >{{ errorMessage }}</span
        >
      </form>
    </div>
  </div>
</template>

<script>
import CityVue from "@/components/CityVue/CityVue.vue";

import draggable from "vuedraggable";

export default {
  name: "SettingsVue",
  data() {
    return {
      query: "",
      isQueryError: false,
    };
  },
  computed: {
    cities() {
      return this.$store.getters.CITIES;
    },
    weatherData() {
      return this.$store.getters.WEATHER_DATA;
    },
    isData() {
      return this.$store.getters.IS_DATA;
    },
    isAdded() {
      return this.$store.getters.IS_ADDED;
    },
    errorMessage() {
      if (!this.isAdded && this.isData) {
        return "The city has already been added.";
      }
      if (this.isQueryError) {
        return this.queryErrorMessage;
      } else
        return "City is not found. Please, check the correctness of the city name or try again later.";
    },
    queryErrorMessage() {
      const queryLength = this.query.length;
      if (queryLength < 2) {
        return "Query must be at least 2 characters length";
      }
      if (queryLength > 60) {
        return "Query length must be less than 60 characters.";
      } else return "";
    },
  },
  methods: {
    search() {
      this.isQueryError = Boolean(this.queryErrorMessage);
      if (!this.isQueryError) {
        this.$store.dispatch("getWeatherData", { q: this.query });
        this.query = "";
      }
    },
    updateOrderMethod() {
      this.$store.dispatch("setCities", this.cities);
      this.$store.dispatch("setOrder");
    },
  },
  components: { CityVue, draggable },
};
</script>

<style scoped>
@import "./SettingsVue.css";
</style>
