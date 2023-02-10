<template>
  <div class="weather-item">
    <h2 class="weather-item__city">{{ cityHeader }}</h2>
    <div v-if="w.isOk">
      <div class="weather-item__container">
        <img class="weather-item__img" :src="w.iconUrl" />
        <p class="weather-item__temp">{{ temp }}</p>
      </div>
      <p class="weather-item__description">{{ description }}</p>
      <div class="weather-item__container">
        <p class="weather-item__data">
          <i class="fa-solid fa-location-arrow"></i>{{ windParams }}
        </p>
        <p class="weather-item__data">
          <i class="fa-solid fa-gauge"></i>{{ pressure }}
        </p>
      </div>
      <div class="weather-item__container">
        <p class="weather-item__data">Humidity: {{ w.humidity }}%</p>
        <p class="weather-item__data">Dew point: {{ w.dewPoint }}°C</p>
      </div>
      <div class="weather-item__container">
        <p class="weather-item__data">Visibility: {{ w.visibility }}km</p>
        <p class="weather-item__data">Daylight: {{ daylight }}</p>
      </div>
    </div>
    <div v-else>
      <p class="weather-item__error">Failed to get weather data.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherVue",
  props: ["w"],

  computed: {
    cityHeader() {
      if (this.w.isOk) {
        return `${this.w.city}, ${this.w.country}`;
      } else return `${this.w.city}`;
    },
    temp() {
      return `${this.w.temp < 0 ? "−" : ""}${Math.abs(this.w.temp)}°C`;
    },
    description() {
      return `Feels like ${this.w.feelsLike < 0 ? "−" : ""}${Math.abs(
        this.w.feelsLike
      )}°C. ${this.w.clouds}.`;
    },
    windParams() {
      return ` ${Math.round(this.w.windSpeed)} m/s, ${this.w.windDirection}`;
    },
    pressure() {
      return ` ${this.w.pressure} hPa`;
    },
    dewPoint() {
      return ` ${this.w.dewPoint}°C`;
    },
    daylight() {
      return `${Math.floor(this.w.daylight / 60)}h ${this.w.daylight % 60}m`;
    },
  },
};
</script>

<style>
@import "./WeatherVue.css";
</style>
