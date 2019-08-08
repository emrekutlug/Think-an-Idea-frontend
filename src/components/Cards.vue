<template>
    <div>
        <div v-for="card in cards" v-bind:key= "card._id">
            <div v-if="card.isActive" >
                <card
                  v-bind:key= "card._id"
                  v-bind:cardID= "card._id"
                  v-bind:title= "card.title"
                  v-bind:body= "card.body"
                  v-bind:creator = "card.creator"
                  v-bind:leader = "card.leader"
                  v-bind:members="card.members"
                  v-bind:date="card.date"
                  v-bind:userDetails="userDetails"
                  v-bind:isActive="card.isActive"
                  v-bind:reason="card.reason"
                  v-bind:getFunction="getFunction"
                />
            </div>
            <div v-else-if="userDetails.userID === card.creator.creatorID || userDetails.isAdmin">
                <card
                    v-bind:key= "card._id"
                    v-bind:cardID= "card._id"
                    v-bind:title= "card.title"
                    v-bind:body= "card.body"
                    v-bind:creator = "card.creator"
                    v-bind:leader = "card.leader"
                    v-bind:members="card.members"
                    v-bind:date="card.date"
                    v-bind:userDetails="userDetails"
                    v-bind:isActive="card.isActive"
                    v-bind:reason="card.reason"
                    v-bind:getFunction="getFunction"
                />
            </div>
        </div>
    </div>

</template>

<script>
    import card from './Card.vue'

    export default {
        data: function(){
            return {
                timer: '',
                realCards: null
            }
        },
        props: {
            getFunction: Function,
            cards: Array,
            userDetails: Object
        },
        mounted(){
            this.getFunction();
        },
        created(){
            this.timer = setInterval(this.getFunction, 3000);
        },
        /*
        methods: {
            getRealCards: function(){
                this.cards.filter(function(card){
                    if(card.isActive === false && card.creator.creatorID === this.userDetails.userID){
                        this.realCards.push(card) ;
                    }else{
                        this.realCards.push(card) ;
                    }
                })
            }
        },

         */
        beforeDestroy() {
            clearInterval(this.timer)
        },
        components: {
            card
        },
        name: 'cards'
    }
</script>