<template>
  <div class="city">
    <p class="city-name">{{ c.city }}</p>
    <button class="city__trash" @click="deleteCity">
      <Delete />
    </button>
  </div>
</template>

<script>
import Delete from "vue-material-design-icons/Delete.vue";

export default {
  name: "CityVue",
  props: ["c"],
  methods: {
    deleteCity(e) {
      e.preventDefault();
      this.$store.dispatch("removeCity", this.c.city);
    },
  },
  components: { Delete },
};
</script>

<style>
@import "./CityVue.css";
</style>
