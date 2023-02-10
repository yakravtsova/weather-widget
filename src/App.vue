<template>
  <router-view />
</template>

<script>
import router from "./router";
import store from "./store";
// @ is an alias to /src
export default {
  name: "App",
  store: store,
  router: router,
};
</script>

<style></style>
