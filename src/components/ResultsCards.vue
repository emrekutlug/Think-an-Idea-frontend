<template>
    <div>
        <results-card v-for="resultscard in resultsCards"
              v-bind:key= "resultscard._id"
              v-bind:cardID= "resultscard._id"
              v-bind:title= "resultscard.title"
              v-bind:body= "resultscard.body"
              v-bind:creator = "resultscard.creator"
              v-bind:leader = "resultscard.leader"
              v-bind:members="resultscard.members"
              v-bind:votes="resultscard.votes"
              v-bind:details="resultscard.details"
              v-bind:date="resultscard.date"/>
    </div>
</template>

<script>
    import resultsCard from './ResultsCard.vue'
    import axios from 'axios'

    export default {
        props: {
            getFunction: Function,
            resultsCards: Array
        },
        mounted() {
            this.getFunction();
        },

        components: {
            resultsCard
        },
        name: 'ResultsCards',
    }
</script>
