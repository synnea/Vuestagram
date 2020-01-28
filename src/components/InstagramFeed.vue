<template>

<div class="container">

  <h3>Instagram Feed</h3>

    <div v-for="post in renderPosts" v-bind:key="post.id">

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
  import _ from 'lodash'; 

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

  mounted () {
      this.fetchPosts();
  },

  computed: {
    renderPosts: function () {
      // receives the image and video posts, concatenates, cleans, orders and returns them.
        if (this.videoPosts.length && this.imagePosts.length) {
          let allPosts = this.imagePosts.concat(this.videoPosts)
          let allPostsShelled = allPosts.map(obj => obj.node )
          let allPostsOrdered = _.orderBy(allPostsShelled, ["taken_at_timestamp"], ["desc"]).slice(0,20)
          console.log(allPostsOrdered)
          return allPostsOrdered

          // if either video or image post arrays are empty, return only the values for the existing array.
          // Note: this function is needlessly bloated and needs refactoring. This method was chosen as a temporary solution due to time constraints.       
          } else if (this.videoPosts.length && !this.imagePosts.length) {
          videoPostsShelled = videoPosts.map(obj => obj.node)
          let allVideoPostsOrdered = _.orderBy(videoPostsShelled, ["taken_at_timestamp"], ["desc"]).slice(0,20)
          return allVideoPostsOrdered
        } else if (!this.videoPosts.length && this.imagePosts.length) {
          imagePostsShelled = imagePosts.map(obj => obj.node)
          let allImagePostsOrdered = _.orderBy(imagePostsShelled, ["taken_at_timestamp"], ["desc"]).slice(0,20)
          return allImagePostsOrdered
        }
        else {
          return this.raiseError()
        }
      },    
  },

  methods: {
        fetchPosts() {
              // makes the API call and saves the response.
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

      raiseError() {
        // gets called if both video and image post arrays were returned empty.
        this.errored = true;
      }
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
