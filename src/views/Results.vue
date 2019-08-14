<template>
    <div>
        <div class="row">
            <div class="col-xl-12">
                <h1 class="title">Result of results Period</h1>
                <h3 class="subtitle">
                    This text is about results of results period
                </h3>
                <br>
            </div>
        </div>
        <br>

        <filters v-bind:isIdeaGeneration="false" v-bind:setIndex="setIndex"/>
        <br>

        <div class="tab-content" id="nav-tabContent">

            <!-- All Ideas -->
            <div class="tab-pane fade show active" id="nav-allIdeas" role="tabpanel" aria-labelledby="nav-allIdeas-tab">
                <results-cards v-bind:getFunction="getAll" v-bind:resultsCards="allCards"/>
            </div>

            <!-- My Ideas -->
            <div class="tab-pane fade" id="nav-myIdeas" role="tabpanel" aria-labelledby="nav-myIdeas-tab">
                <results-cards v-bind:getFunction="getCreatorIdeas" v-bind:resultsCards="myIdeasCards" />
            </div>

            <!-- I Member -->
            <div class="tab-pane fade" id="nav-iMember" role="tabpanel" aria-labelledby="nav-iMember-tab">
                <results-cards v-bind:getFunction="getParticipatingIdeas" v-bind:resultsCards="iMemberCards" />
            </div>

            <!-- I Lead -->
            <div class="tab-pane fade" id="nav-iLead" role="tabpanel" aria-labelledby="nav-iLead-tab">
                <results-cards v-bind:getFunction="getLeadingIdeas" v-bind:resultsCards="iLeadCards" />
            </div>

            <!--I Vote
            <div class="tab-pane fade" id="nav-iVote" role="tabpanel" aria-labelledby="nav-iVote-tab">
                <results-cards v-bind:getFunction="getVotedIdea" v-bind:resultsCards="iVoteCard" />
            </div>
            -->

        </div>
    </div>
</template>

<script>
    import filters from '../components/Filters.vue';
    import axios from 'axios'
    import resultsCards from "../components/ResultsCards.vue";

    export default {
        data() {
            return {
                tabFunction: Function,
                allCards: null,
                myIdeasCards: null,
                iMemberCards: null,
                iLeadCards: null,
                iVoteCard: null,
                tabIndex: 1
            }
        },
        methods: {
            getAll: function() {
                axios
                    .get(`${process.env.VUE_APP_BACKENDURL}/results/allIdeas`,)
                    .then(response => {
                        this.allCards = response.data
                    }).catch(error =>{
                    console.log(error)
                })
            },
            getCreatorIdeas: function() {
                axios
                    .get(`${process.env.VUE_APP_BACKENDURL}/results/myIdeas`,
                        {params: {id: this.userID}})
                    .then(response => {
                        this.myIdeasCards = response.data
                    }).catch(error =>{
                    console.log(error)
                })
            },
            getParticipatingIdeas: function() {
                axios
                    .get(`${process.env.VUE_APP_BACKENDURL}/results/iMember`,
                        {params: {id: '2'}})
                    .then(response => {
                        this.iMemberCards = response.data
                    }).catch(error =>{
                    console.log(error)
                })
            },
            getLeadingIdeas: function() {
                axios
                    .get(`${process.env.VUE_APP_BACKENDURL}/results/iLead`,
                        {params: {id: '321'}})
                    .then(response => {
                        this.iLeadCards = response.data
                    }).catch(error =>{
                    console.log(error)
                })
            },
            /*
            getVotedIdea: function() {
                axios
                    .get('http://localhost:1234/results/myVote',
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
            }
        },
        components: {
            resultsCards,
            filters
        }
    }
</script>
