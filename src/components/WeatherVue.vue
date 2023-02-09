<template>
  <div class="weather-wrap">
    <img :src="w.iconUrl" />
    <h2 class="city">{{ w.city }}</h2>
    <p class="temp">{{ w.temp }}</p>
    <p class="weather">{{ w.weather }}</p>
  </div>
</template>

<script>
export default {
  name: "WeatherVue",
  props: ["w"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  width: 30px;
  height: 30px;
}

.error {
  text-align: center;
  font-size: 14px;
  color: red;
}

.weather-wrap {
  width: 210px;
  height: 280px;
  border: 1px solid #000;
  margin-left: 50px;
}

.city {
  font-size: 25px;
}

.weather {
  font-size: 14px;
}
</style>
