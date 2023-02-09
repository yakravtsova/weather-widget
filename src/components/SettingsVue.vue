<template>
  <div class="settings">
    <form class="d-flex flex-column" role="search">
      <div class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Country/City/ZIP code"
          aria-label="Search"
          @keyup.enter="search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </div>
      <span v-if="!isData" class="error"
        >Не удалось получить данные. Проверьте правильность названия города или
        попробуйте позже</span
      >
    </form>
    <!--  <ul v-for="city in cities" v-bind:key="city.city">
      <li><CityVue v-bind:c="city" /></li>
    </ul> -->
    <!--  <draggable
      tag="ul"
      :list="cities"
      handle=".handle"
      @change="updateOrderMethod"
    >
      <li v-for="city in cities" :key="city.city">
        <i class="fa handle"></i>
        <CityVue v-bind:c="city" />

          <i class="fa fa-times close" @click="removeAt(idx)"></i>
      </li>
    </draggable> -->
    <draggable
      tag="ul"
      :list="weatherData"
      handle=".handle"
      @change="updateOrderMethod"
    >
      <li v-for="w in weatherData" :key="w.city">
        <i class="fa handle"></i>
        <CityVue v-bind:c="w" />

        <!--  <i class="fa fa-times close" @click="removeAt(idx)"></i>-->
      </li>
    </draggable>
  </div>
</template>

<script>
import CityVue from "./CityVue.vue";

import draggable from "vuedraggable";

export default {
  name: "SettingsVue",
  computed: {
    cities() {
      /*  get() {
        return this.$store.getters.CITIES;
      },
      set(value) {
        this.$store.commit("SET_CITIES", value);
      },*/
      return this.$store.getters.CITIES;
    },
    weatherData() {
      return this.$store.getters.WEATHER_DATA;
    },
    isData() {
      return this.$store.getters.IS_DATA;
    },
  },
  methods: {
    search(e) {
      let query = { q: e.target.value };
      this.$store.dispatch("getWeatherData", query);
      e.target.value = "";
    },
    updateOrderMethod() {
      console.log("drag");
      this.$store.dispatch("setCities", this.cities);
      this.$store.dispatch("setOrder");
    },
  },
  components: { CityVue, draggable },
};
</script>

<style scoped>
.settings {
  width: 210px;
  height: 280px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}

.fa {
  width: 30px;
  height: 30px;
  background-color: #000;
}

.error {
  color: red;
}
</style>
