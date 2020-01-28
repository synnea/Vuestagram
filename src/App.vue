<template>
  <div id="app">
    <instagram-feed />
  </div>
</template>

<script>
import InstagramFeed from './components/InstagramFeed.vue';

export default {
  name: 'app',
  components: {
    InstagramFeed,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
