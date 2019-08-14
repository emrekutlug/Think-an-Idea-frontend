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
  //axios.defaults.withCredentials = true;
  export default {
    components: {
      navbar
    },
    beforeMount() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_BACKENDURL}/auth/logged`,
        withCredentials : true
      }).then(r => {
        console.log(r.data);
        if(!r.data.logged) {
          window.location.href=`${process.env.VUE_APP_BACKENDURL}/auth/login`
        }
      })
      .catch(e => {
        console.log(e);
      });
    }
  }

</script>