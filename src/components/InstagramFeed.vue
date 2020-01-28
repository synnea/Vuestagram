<template>

<div class="container">

  <h3>Instagram Feed</h3>

    <div v-for="post in renderPosts" v-bind:key="post.id">

       <div v-if="post.is_video">

          <div class="panel">
             <img :src="post.display_url" class="img-fluid" alt="instagram-video-feed-photo" />
            <h3>Views: {{ post.video_view_count }} </h3></div>

        </div>

        <div v-else>
          <div class="panel">
            <img :src="post.display_url" class="img-fluid" alt="instagram-image-feed-photo" />

            <h3>Likes: {{post.edge_liked_by.count }}</h3>

          </div>
        </div>

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
      // 
        if (this.videoPosts.length && this.imagePosts.length) {
          let allPosts = this.imagePosts.concat(this.videoPosts)

          return this.returnPostArray(allPosts)

          // if either video or image post arrays are empty, return only the values for the existing array.

          } else if (this.videoPosts.length && !this.imagePosts.length) {
          let allPosts = this.videoPosts
          return this.returnPostArray(allPosts)

        } else if (!this.videoPosts.length && this.imagePosts.length) {
          let allPosts = this.imagePosts
          return this.returnPostArray(allPosts)
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
      },

      returnPostArray(arg) {
        // receives the correct posts from renderPosts, shells and orders them.

        let allPostsShelled = arg.map(obj => obj.node)
        let allPostsOrdered = _.orderBy(allPostsShelled, ["taken_at_timestamp"], ["desc"]).slice(0,20)
        return allPostsOrdered

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
