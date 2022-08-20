<template>
  <div id="app">
    <band-header />
  </div>
</template>

<script>
import BandHeader from './components/BandHeader.vue';

export default {
  name: 'App',
  components: {
    BandHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
