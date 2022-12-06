<template>
  <router-link :to="route">{{ buttonText }}</router-link>
  <!-- <router-link to="login"> login </router-link> -->
</template>

<script setup>
defineProps({
  route: String,
  buttonText: String,

});
</script>

<style></style>
