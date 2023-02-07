<template>
  <div class="settings">
    <form class="d-flex" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Country/City/ZIP code"
        aria-label="Search"
        @keyup.enter="search"
      />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    <ul v-for="city in cities" v-bind:key="city">
      <li><CityVue v-bind:c="city" /></li>
    </ul>
  </div>
</template>

<script>
import CityVue from "./CityVue.vue";

export default {
  name: "SettingsVue",
  computed: {
    cities() {
      return this.$store.getters.CITIES;
    },
    weatherData() {
      return this.$store.getters.WEATHER_DATA;
    },
  },
  methods: {
    search(e) {
      let query = { q: e.target.value };
      this.$store.dispatch("getWeatherData", query);
      e.target.value = "";
    },
  },
  components: { CityVue },
};
</script>

<style scoped>
.settings {
  width: 210px;
  height: 280px;
}
</style>
