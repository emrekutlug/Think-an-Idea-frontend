<template>
    <div>
        <div  v-if="userDetails === null">
            <loading />
        </div>

        <div v-if="userDetails !== null">


            <div class="row">
                <div class="col-xl-12">
                    <h1 class="title">Vote an Idea</h1>
                    <h3 class="subtitle">
                        Welcome to Voting Section. In this section take a look at the ideas that attract you more and choose one of them
                    </h3>
                    <h1 style="color:orange;"> VOTING ENDS IN 60 DAYS </h1>
                    <br>
                </div>
            </div>
            <br>

            <div class="row" style="margin: 0px;margin-bottom:20px ">
                <h2>Ideas to Vote</h2>
            </div>

            <filters v-bind:isIdeaGeneration="false" v-bind:setIndex="setIndex"/>
            <br>

            <div class="tab-content" id="nav-tabContent">

                <!-- All Ideas -->
                <div class="tab-pane fade show active" id="nav-allIdeas" role="tabpanel" aria-labelledby="nav-allIdeas-tab">
                    <voting-cards v-bind:userDetails="userDetails" v-bind:getFunction="getAll" v-bind:votingCards="allCards"/>
                </div>

                <!-- My Ideas -->
                <div class="tab-pane fade" id="nav-myIdeas" role="tabpanel" aria-labelledby="nav-myIdeas-tab">
                    <voting-cards v-bind:userDetails="userDetails" v-bind:getFunction="getCreatorIdeas" v-bind:votingCards="myIdeasCards" />
                </div>

                <!-- I Member -->
                <div class="tab-pane fade" id="nav-iMember" role="tabpanel" aria-labelledby="nav-iMember-tab">
                    <voting-cards v-bind:userDetails="userDetails" v-bind:getFunction="getParticipatingIdeas" v-bind:votingCards="iMemberCards" />
                </div>

                <!-- I Lead -->
                <div class="tab-pane fade" id="nav-iLead" role="tabpanel" aria-labelledby="nav-iLead-tab">
                    <voting-cards v-bind:userDetails="userDetails" v-bind:getFunction="getLeadingIdeas" v-bind:votingCards="iLeadCards" />
                </div>

                <!--I Vote
                <div class="tab-pane fade" id="nav-iVote" role="tabpanel" aria-labelledby="nav-iVote-tab">
                    <voting-cards v-bind:getFunction="getVotedIdea" v-bind:votingCards="iVoteCard" />
                </div>
                -->

            </div>

        </div>
    </div>
</template>

<script>
    import loading from "../components/Loading.vue";
    import filters from '../components/Filters.vue';
    import axios from 'axios';
    import votingCards from "../components/VotingCards.vue";

    export default {
        props:{
            user: String
        },
        data() {
            return {
                tabFunction: Function,
                allCards: null,
                myIdeasCards: null,
                iMemberCards: null,
                iLeadCards: null,
                iVoteCard: null,
                tabIndex: 1,
                userDetails: null,
            }
        },
        methods: {
            getAll: function() {
                axios
                    .get('http://localhost:1234/voting/allIdeas')
                    .then(response => {
                        this.allCards = response.data
                    }).catch(error =>{
                    console.log(error)
                })
            },
            getCreatorIdeas: function() {
                axios
                    .get('http://localhost:1234/voting/myIdeas',
                    {params: {id: this.userDetails.userID}})
                    .then(response => {
                        this.myIdeasCards = response.data
                    }).catch(error =>{
                    console.log(error)
                })
            },
            getParticipatingIdeas: function() {
                axios
                    .get('http://localhost:1234/voting/iMember',
                    {params: {id: this.userDetails.userID}})
                    .then(response => {
                        this.iMemberCards = response.data
                    }).catch(error =>{
                    console.log(error)
                })
            },
            getLeadingIdeas: function() {
                axios
                    .get('http://localhost:1234/voting/iLead',
                    {params: {id: this.userDetails.userID}})
                    .then(response => {
                        this.iLeadCards = response.data
                    }).catch(error =>{
                    console.log(error)
                })
            },
            //TODO
            /*
            getVotedIdea: function() {
                axios
                    .get('http://localhost:1234/voting/myVote',
                        {params: {id: '321'}})
                    .then(response => {
                        this.iVoteCard = response.data
                    }).catch(error =>{
                    console.log(error)
                })
            },
            */
            setIndex: function(index){
                switch(index) {
                    case 1: this.getAll(); break;
                    case 2: this.getCreatorIdeas(); break;
                    case 3: this.getParticipatingIdeas(); break;
                    case 4: this.getLeadingIdeas(); break;
                    //case 5: this.getVotedIdea(); break;
                }
                this.tabIndex = index
            },
            getFunc: function(){
                switch(this.tabIndex) {
                    case 1: return this.getAll;
                    case 2: return this.getCreatorIdeas;
                    case 3: return this.getParticipatingIdeas;
                    case 4: return this.getLeadingIdeas;
                    //case 5: return this.getVotedIdea;
                }
            },
            getAllAttributes: async function(){
                let result = await axios({
                    method: 'GET',
                    url: 'http://localhost:1234/getAllAttributes',
                    headers: {'Access-Control-Allow-Origin': '*'},
                    withCredentials : true
                });
                // Don't forget to return something
                return result.data
            },
            isAdmin: async function(userID){
                let result = await axios({
                    method: 'GET',
                    url: 'http://localhost:1234/users/getUser',
                    params: {uid: userID}
                });
                return result.data
            }
        },
        created: async function(){
            let getAllAttributesResult = await this.getAllAttributes();
            console.log("getAllAttributesResult: ",getAllAttributesResult);

            let userID = getAllAttributesResult.userInfo.identities[0].idpUserInfo.attributes.uid;
            let userName = getAllAttributesResult.userInfo.identities[0].idpUserInfo.attributes.cn;

            let isAdminResult = await this.isAdmin(userID);
            let isAdmin = isAdminResult.result[0].isAdmin;

            this.userDetails = {"userID": userID, "userName": userName, "isAdmin": isAdmin};
            console.log("User Details: ",this.userDetails);
        },
        components: {
            votingCards,
            filters,
            loading
        }
    }
</script>
