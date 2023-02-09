<template>
  <div class="home">
    <p>Введите название страны, города, индекс или координаты</p>
    <p>
      Документация API:
      <a href="https://openweathermap.org/current">Weather API</a>
    </p>
    <div class="d-flex">
      <div v-if="!isGeoOn">
        <h2 class="error">Не удалось определить ваше местоположение.</h2>
      </div>
      <div v-else-if="!cities.length">
        <h2 class="error">Список пуст</h2>
      </div>
      <ul v-else>
        <li v-for="w in weatherData" :key="w.order" class="d-flex column">
          <WeatherVue v-bind:w="w" />
          {{ w.id }}
        </li>
      </ul>

      <SettingsVue />
    </div>
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
    isGeoOn() {
      return this.$store.getters.IS_GEO_ON;
    },
  },
  methods: {
    setQuery(pos) {
      return { lat: pos.coords.latitude, lon: pos.coords.longitude };
    },
    getLocalWeatherData(pos) {
      const query = this.setQuery(pos);
      this.$store.dispatch("getWeatherData", query);
      this.$store.dispatch("setGeoOn", true);
    },
  },
  async created() {
    let citiesArr = JSON.parse(localStorage.getItem("cities"));
    if (citiesArr !== null) {
      this.$store.dispatch("setCities", citiesArr);
      await this.$store.dispatch("getAllWeatherData");
    } else {
      console.log("on");
      navigator.geolocation.getCurrentPosition(
        this.getLocalWeatherData,
        this.$store.dispatch("setGeoOn", false)
      );
    }
  },
};
</script>
