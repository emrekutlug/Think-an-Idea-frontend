<template>
    <div>
        <voting-card v-for="votingcard in votingCards"
              v-bind:key= "votingcard._id"
              v-bind:cardID= "votingcard._id"
              v-bind:title= "votingcard.title"
              v-bind:body= "votingcard.body"
              v-bind:creator = "votingcard.creator"
              v-bind:leader = "votingcard.leader"
              v-bind:members="votingcard.members"
              v-bind:votes="votingcard.votes"
              v-bind:details="votingcard.details"
              v-bind:date="votingcard.date"
              v-bind:getFunction="getFunction"
              v-bind:userDetails="userDetails"
        />
    </div>
</template>

<script>
    import votingCard from './VotingCard.vue'

    export default {
        props: {
            getFunction: Function,
            votingCards: Array,
            userDetails: Object
        },
        mounted(){
            this.getFunction();
        },
        created(){
            this.timer = setInterval(this.getFunction, 3000);
        },
        beforeDestroy() {
            clearInterval(this.timer)
        },
        components: {
            votingCard
        },
        name: 'votingCards',
    }
</script>
