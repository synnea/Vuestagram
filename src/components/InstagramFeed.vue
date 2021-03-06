<template>

  <div class="container">
    <h3 class="headline">Instagram Feed</h3>

    <div class="grid-row">
      <div v-for="post in renderPosts" v-bind:key="post.id">

        <div v-if="post.is_video">

          <div class="panel hvr-grow" >

      <LazyImage
        class="img-fluid"
        :source="post.display_url"
      />
            <div class="views"><h5><i class="fas fa-play"></i> {{ post.video_view_count }} </h5></div>
          </div>

        </div>

        <div v-else>
          <div class="panel hvr-grow">
      <LazyImage
        class="img-fluid"
        :source="post.display_url"
      />

             <div class="likes"><h5><i class="fas fa-heart"></i> {{post.edge_liked_by.count }}</h5></div>

          </div>
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
  import LazyImage from './LazyImage.vue';

  export default {
  name: 'InstagramFeed',
  components: {
    LazyImage,
  },
  data () {
    return {
      imagePosts: [],
      videoPosts: [],
      errored: false,
      loading: true,
      useCachedData: false
    }
  },

    created () {
  this.compareCache();
  },

  computed: {

    renderPosts: function () {

      if (this.useCachedData === true) {

        // if the useCachedData flag has been set to true, retrieve value from cache.
        let localStorageString = JSON.parse(localStorage.getItem("feed"))
        let allPostsOrdered = localStorageString.value
        return allPostsOrdered
      }

      else {
          // if useCachedData is false, retrieve the data from the API response

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
          return this.load()
        }

        }

      },    
  },

  methods: {
        fetchPosts() {
              // makes the API call and saves the response.
    axios
        .get('https://www.instagram.com/artnightevents/?__a=1')
        .then((response) => {
        this.imagePosts = response.data.graphql.user.edge_owner_to_timeline_media.edges;
        this.videoPosts = response.data.graphql.user.edge_felix_video_timeline.edges; })
        .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);

          },

      load() {
        // gets called if both video and image post arrays were returned empty, which means that the API call
        // has not happened yet.
        this.loading = true;
      },

      returnPostArray(arg) {
        // receives the correct posts from renderPosts and then shells and orders them.
        // Also saves the to-render array along with the timestamp + 1 hour to localStorage.

        let allPostsShelled = arg.map(obj => obj.node)
        let allPostsOrdered = _.orderBy(allPostsShelled, ["taken_at_timestamp"], ["desc"]).slice(0,20)

        let feed = {value: allPostsOrdered, expiry: ((new Date().getTime()) + 60*60*1000)}
        localStorage.setItem('feed', JSON.stringify(feed))

        this.loading = false

        return allPostsOrdered

      },

    compareCache() {

      // checks if the feed is already in localStorage and if the expiry date is in the future.
      // if either condition is untrue, a new API call is made.

          if (localStorage.getItem("feed") !== null) {
            let now = new Date().getTime()
            let localStorageString = JSON.parse(localStorage.getItem("feed"))
            let expiry = localStorageString.expiry
            if (now < expiry) {
                this.useCachedData = true
            } else {
              this.useCachedData = false
              localStorage.removeItem('feed');
              this.fetchPosts();
            }
          } else {
            this.useCachedData = false
            this.fetchPosts();
          }
        }
      
      },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style css>
  h3 {
    margin-bottom: 5%;
  }

  h5 {
    margin: 0;
    padding: 0;
  }
  .headline {
  font-family: 'Zhi Mang Xing', cursive;
  font-size: 4rem;
}
  .container {
  max-width: 1335px;
  margin: 0 auto;
  padding: 10vh;
  padding-top: 10vh;
}
.grid-row {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.panel {
  font-family: 'Segoe UI', sans-serif;
  max-height: 550px;
  flex-basis: 20%;
  -ms-flex: auto;
  flex: auto;
  max-width: 350px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}

.spacer-panel {
  width: 350px;
}
.img-fluid {
  max-height: 100%;
  max-width: 100%;
  min-height: 300px;
  width: auto;
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
}

@media (max-width: 768px) {
  .img-fluid {
      min-height: 100px;
  }
  .container {
    margin-top: 5vh;
  }

}

.likes {
  background-color: #D72D78;
  padding: 5px;
}

.views {
  background-color: #0066FF;
  padding: 5px;
}
</style>
