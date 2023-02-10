<template>
  <div class="city">
    <p class="city-name">{{ c.city }}</p>
    <button class="city__trash" @click="deleteCity">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "CityVue",
  props: ["c"],
  methods: {
    deleteCity(e) {
      e.preventDefault();
      this.$store.dispatch("removeCity", this.c.city);
    },
  },
};
</script>

<style>
@import "./CityVue.css";
</style>
