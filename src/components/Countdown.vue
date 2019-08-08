<template>
    <div>
        <VueCountdown :time="time" :end-time="0" @end="goVoting">
            <h1 slot-scope="props" style="color: darkorange">Time Remaining：{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds.</h1>
        </VueCountdown>
        <button @click="goVoting">Go Voting</button>
    </div>
</template>

<script>
    import VueCountdown from '@chenfengyuan/vue-countdown';
    import axios from 'axios';

    export default {
        components: {
            VueCountdown
        },
        data (){
            return {
                time: null
            }
        },
        beforeCreate: async function() {
            let result = await axios({
                method: 'GET',
                url: 'http://localhost:1234/countdown/deadline'
            })
            this.time = result.data.deadline
            console.log("Time is: " + this.time)
        },

        methods: {
            goVoting: function () {
                if(this.time != null) {
                    //console.log("goVoting Pressed")
                    this.$router.push({ path: '/voting' })
                }


            }
        }

    }
</script>
