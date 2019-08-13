<template>

    <div>

        <div  v-if="userDetails === null">
            <loading />
        </div>

        <div v-if="userDetails !== null">

            <ideaform v-bind:getFunction="getFunc"/>
            <br>

            <div class="row">
                <div class="col-xl-12">
                    <h2>Created Ideas</h2>
                    <br>
                </div>
            </div>

            <filters v-bind:isIdeaGeneration="true" v-bind:setIndex="setIndex"/>
            <br>

            <div class="tab-content" id="nav-tabContent">

                <!-- All Ideas -->
                <div class="tab-pane fade show active" id="nav-allIdeas" role="tabpanel" aria-labelledby="nav-allIdeas-tab">
                    <cards v-bind:userDetails="userDetails" v-bind:getFunction="getAll" v-bind:cards="allCards" />
                </div>

                <!-- My Ideas -->
                <div class="tab-pane fade" id="nav-myIdeas" role="tabpanel" aria-labelledby="nav-myIdeas-tab">
                    <cards v-bind:userDetails="userDetails" v-bind:getFunction="getCreatorIdeas" v-bind:cards="myIdeasCards" />
                </div>

                <!-- I Member -->
                <div class="tab-pane fade" id="nav-iMember" role="tabpanel" aria-labelledby="nav-iMember-tab">
                    <cards v-bind:userDetails="userDetails" v-bind:getFunction="getParticipatingIdeas" v-bind:cards="iMemberCards" />
                </div>

                <!-- I Lead -->
                <div class="tab-pane fade" id="nav-iLead" role="tabpanel" aria-labelledby="nav-iLead-tab">
                    <cards v-bind:userDetails="userDetails" v-bind:getFunction="getLeadingIdeas" v-bind:cards="iLeadCards"/>
                </div>

            </div>

        </div>


    </div>
</template>


<script>
    import loading from "../components/Loading.vue";
    import ideaform from '../components/IdeaForm.vue';
    import cards from '../components/Cards.vue';
    import filters from '../components/Filters.vue';
    import axios from 'axios'


    export default {
        props:{
            user: String
        },
        data() {
            return {
                allCards: null,
                myIdeasCards: null,
                iMemberCards: null,
                iLeadCards: null,
                tabIndex: 1,
                userDetails: null,
            }
        }
        ,
        methods: {
            getAll: function() {
                axios
                .get(`${process.env.VUE_APP_BACKENDURL}/idea/allIdeas`)
                .then(response => {
                    this.allCards = response.data;
                    console.log(response.data);
                }).catch(error =>{
                    console.log(error)
                })
            },
            getCreatorIdeas: function() {
                axios
                .get(`${process.env.VUE_APP_BACKENDURL}/idea/myIdeas`,
                {params: {id: this.userDetails.userID}})
                .then(response => {
                    this.myIdeasCards = response.data
                }).catch(error =>{
                    console.log(error)
                })
            },
            getParticipatingIdeas: function() {
                axios
                .get(`${process.env.VUE_APP_BACKENDURL}/idea/iMember`,
                {params: {id: this.userDetails.userID}})
                .then(response => {
                    this.iMemberCards = response.data
                }).catch(error =>{
                    console.log(error)
                })
            },
            getLeadingIdeas: function() {
                axios
                .get(`${process.env.VUE_APP_BACKENDURL}/idea/iLead`,
                {params: {id: this.userDetails.userID}})
                .then(response => {
                    this.iLeadCards = response.data
                }).catch(error =>{
                    console.log(error)
                })
            },
            setIndex: function(index){
                switch(index) {
                    case 1: this.getAll(); break;
                    case 2: this.getCreatorIdeas(); break;
                    case 3: this.getParticipatingIdeas(); break;
                    case 4: this.getLeadingIdeas(); break;
                }
                this.tabIndex = index
            },
            getFunc: function(){
                switch(this.tabIndex) {
                    case 1: return this.getAll;
                    case 2: return this.getCreatorIdeas;
                    case 3: return this.getParticipatingIdeas;
                    case 4: return this.getLeadingIdeas;
                }
            },
            getAllAttributes: async function(){
                let result = await axios({
                    method: 'GET',
                    url: `${process.env.VUE_APP_BACKENDURL}/getAllAttributes`,
                    headers: {'Access-Control-Allow-Origin': '*'},
                    withCredentials : true
                });
                // Don't forget to return something
                return result.data
            },
            isAdmin: async function(userID){
                let result = await axios({
                    method: 'GET',
                    url: `${process.env.VUE_APP_BACKENDURL}/users/getUser`,
                    params: {uid: userID}
                });
                return result.data
            }
        },
        created: async function(){
            let getAllAttributesResult = await this.getAllAttributes();
            let userID = getAllAttributesResult.userInfo.identities[0].idpUserInfo.attributes.uid;
            let userName = getAllAttributesResult.userInfo.identities[0].idpUserInfo.attributes.cn;

            let isAdminResult = await this.isAdmin(userID);
            let isAdmin = isAdminResult.result[0].isAdmin;

            this.userDetails = {"userID": userID, "userName": userName, "isAdmin": isAdmin};
            console.log("User Details: ",this.userDetails);
        },
        components: {
            loading,
            ideaform,
            cards,
            filters
        }
    }
</script>
