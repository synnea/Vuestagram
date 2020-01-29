# Vuestagram

![demo-image](https://github.com/synnea/Vuestagram/blob/master/public/demo.JPG)


Vuestagram is a Vue.js app that utilizes the axios library to fetch the latest 20 posts from the @artnightevents Instagram account and display them in a fluid grid.

The feed is cached locally and is valid for an hour.

A deployed version is available [here](https://synnea.github.io/Vuestagram/)

## Features 

#### Feature 1 - Axios API Call
The project fetches results from instagram to display data.

#### Feature 2 - Local Cache
The project sets a localStorage with the API call results and sends a new request only if there is no previous storage or it is older than an hour.

#### Feature 3 - Fluid Grid
The project utilizes flexbox for responsiveness.

#### Feature 4 - Lazy Load
The project uses the Intersection Observer API to lazy load the images at the bottom of the feed.

## Technologies Used

HTML5, CSS3, JavaScript, Vue.js, Axios.

### installs
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
