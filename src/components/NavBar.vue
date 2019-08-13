<template>
    <div>
        <nav class="navbar  navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <img src="../assets/logo.png" width="65" height="25" alt="">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03"
                    aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor03">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Idea <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Voting</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Results</a>
                    </li>
                </ul>


                <h5 style= "margin-right:20px; margin-top:10px">{{username}}</h5>
                <button type="button" @click="logout" id="Logout" class="btn btn-dark" >Logout</button>

            </div>
        </nav>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                username : null
            }
        },
        methods: {
            logout() {
                window.location.href = `${process.env.VUE_APP_BACKENDURL}/auth/logout`;
            },
            async getAllAttributes(){
                let result = await axios({
                    method: 'GET',
                    url:  `${process.env.VUE_APP_BACKENDURL}/getAllAttributes`,
                    headers: {'Access-Control-Allow-Origin': '*'},
                    withCredentials : true
                });
                return result.data
            }
        },
        created: async function(){
            let result = await this.getAllAttributes();
            this.username = result.userInfo.identities[0].idpUserInfo.attributes.cn;
        }
    }

</script>