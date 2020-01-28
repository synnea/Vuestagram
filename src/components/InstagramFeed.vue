<template>

<div class="container">

  <h3>Instagram Feed</h3>

  <div v-for="post in imagePosts" v-bind:key="post.id">
{{ post }}
    </div>

    <section v-if="errored">
    <p>We're sorry, we're not able to retrieve this information at the moment,
      please try back later</p>
  </section>

  <section v-else>
    <div v-if="loading">Loading...</div>
    </section>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'InstagramFeed',
  data () {
    return {
      imagePosts: [],
      videoPosts: [],
      errored: false,
      loading: true
    }
  },

  created () {
      this.fetchPosts();
  },

  methods: {
        fetchPosts() {
    axios
        .get('http://localhost:8080/artnight.json')
        .then((response) => {
        this.imagePosts = response.data.graphql.user.edge_owner_to_timeline_media.edges;
        this.videoPosts = response.data.graphql.user.edge_felix_video_timeline.edges; })
        .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);

          },
  }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
