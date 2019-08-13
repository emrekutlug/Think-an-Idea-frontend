<template>
  <div id="app">
      <div v-if="true">
        <navbar />
    <!--    
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    -->
    <div class="container-fluid" style="padding-right:200px;padding-left:200px; padding-top: 35px;">
        <router-view/>
    </div>
      </div>
  </div>
</template>

<script>
  import navbar from "./components/NavBar.vue"
  import axios from 'axios';
  import {getEndpointURL} from "./util/api";
  //axios.defaults.withCredentials = true; 
  export default {
    components: {
      navbar
    },
    beforeMount() {
      console.log("process.env", process.env);
      console.log("Environment", process.env.VUE_APP_BACKENDURL);
      console.log("getEndpointURL", getEndpointURL());

      axios({
        method: 'get',
        url: `${getEndpointURL()}/auth/logged`,
        withCredentials : true
      }).then(r => {
        console.log(r.data);
        if(!r.data.logged) {
          window.location.href=`${getEndpointURL()}/auth/login`
        }
      })
      .catch(e => {
        console.log(e);
      });
    },
    mounted() {
      console.log('mounted');
    }
    
  }

</script>