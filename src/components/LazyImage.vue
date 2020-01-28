
// Code for this LazyImage component taken from https://alligator.io/vuejs/lazy-image/

<template>
  <img :src="srcImage" />
</template>

<script>
export default {
  props: ['source'],
  data: () => ({ observer: null, intersected: false }),
  computed: {
    srcImage() {
      return this.intersected ? this.source : '';
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      const image = entries[0];
      if (image.isIntersecting) {
        this.intersected = true;
        this.observer.disconnect();
      }
    });

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  }
}
</script>