<template>
  <div class="home">
    <p>Введите название страны, города, индекс или координаты</p>
    <p>
      Документация API:
      <a href="https://openweathermap.org/current">Weather API</a>
    </p>
    <ul v-for="(w, key) in weatherData" v-bind:key="key">
      <li>
        <WeatherVue v-bind:w="w" />
        {{ key }}
      </li>
    </ul>
    <SettingsVue />
  </div>
</template>

<script>
// @ is an alias to /src
import SettingsVue from "@/components/SettingsVue.vue";
import WeatherVue from "@/components/WeatherVue.vue";

export default {
  name: "HomeView",
  components: {
    WeatherVue,
    SettingsVue,
  },
  data() {
    return {
      query: {},
      data: [],
    };
  },
  updated() {
    console.log("upd");
  },
  computed: {
    cities() {
      return this.$store.getters.CITIES;
    },
    weatherData() {
      return this.$store.getters.WEATHER_DATA;
    },
  },
  methods: {
    setQuery(pos) {
      return { lat: pos.coords.latitude, lon: pos.coords.longitude };
    },
    getLocalWeatherData(pos) {
      const query = this.setQuery(pos);
      this.$store.dispatch("getWeatherData", query);
    },
  },
  async created() {
    let citiesArr = JSON.parse(localStorage.getItem("cities"));
    if (citiesArr !== null) {
      this.$store.dispatch("setCities", citiesArr);
      await this.$store.dispatch("getAllWeatherData");
    } else {
      navigator.geolocation.getCurrentPosition(this.getLocalWeatherData);
    }
  },
};
</script>
