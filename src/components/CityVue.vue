<template>
  <div class="city-container">
    <p class="city-name">{{ c.city }}</p>
    <button @click="deleteCity">Удалить</button>
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
      console.log("click");
    },
  },
};
</script>

<style>
.city-container {
  display: flex;
  align-items: center;
  border: 1px solid #000;
}
.city-name {
  margin: 0 10px 0 0;
}
</style>
