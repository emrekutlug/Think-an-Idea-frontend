<template>
    <div class="row">
        <div class="col-xl-12">
            <h1 class="title">Think an Idea<small class="text-muted" style="font-size: 25px;"> is an IBM Human Resources Project</small></h1>
            <br>
            <h3 class="subtitle">
                If you as an IBMer, believe that you can make your workplace and worklife better with your idea
                but hesitate to say it out loud or don't think that your idea is strong enough to propose it to your manager
                or colleagues, this is the perfect place for you!
            </h3>
            <br>
            <h3 class="subtitle">
                You can raise your idea from 'Idea' page and
                see if anyone wants to contribute your project and what is more, your idea will be voted after this idea generation period ends.
                Stay tuned for more in 'Voting' and 'Results' page.
            </h3>
            <br>
            <div class="card text-white bg-secondary mb-3" style="padding-left: 30px; padding-right: 30px; max-width: 100%; padding-top: 20px" id="ideaCard">
                <form>
                    <fieldset>
                        <div class="form-group">
                            <countdown />
                            <h1>Create an Idea</h1>
                            <label for="InputTitle">Title</label>
                            <input type="ideaTitle" v-model="title" class="form-control" id="InputTitle" placeholder="Enter Idea Title">
                        </div>
                        <div class="form-group">
                            <label for="exampleTextarea">Body</label>
                            <textarea class="form-control" v-model="body" id="exampleTextarea" rows="3" placeholder="Enter Idea Description"></textarea>
                        </div>
                        <button type="button" @click="postIdea" id="SubmitButton" class="btn btn-dark" style= "margin-bottom:20px">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import dateFormat from 'dateformat';

    import countdown from "../components/Countdown.vue";

    export default {
        props: {
            getFunction: Function,
        },
        data () {
            return {
                title : null,
                body : null,
                creator : null,
            }
        },
        methods: {
             async postIdea(){
                let result = await this.getCreatorID();
                this.creator = result.userInfo.identities[0].idpUserInfo.attributes;
                let now = new Date();
                let dateFormated = dateFormat(now, "mmmm dS, yyyy, h:MM:ss TT");
                axios({
                    method: 'POST',
                    url: `${process.env.VUE_APP_BACKENDURL}/idea/ideas`,
                    //data: {title: {title: this.title, edit:false}, body: this.body, creator: {creatorID: this.creator.uid, creatorName: this.creator.cn }, leader: null, members: [], isActive: true, time: this.time},
                    data: {title: this.title, body: this.body, creator: {creatorID: this.creator.uid, creatorName: this.creator.cn }, leader: null, members: [], isActive: true, date: dateFormated, details: {justification: null, costs: [], influenceArea: null, timeline:[], boxlink: null, status: null, votes: null } },
                })
                .then(response =>{
                    this.title= null;
                    this.body= null;
                    const getFunc = this.getFunction();
                    getFunc();
                })
                .catch(error => alert(error));

                //{"title": "This is Isparta", "body": "This is Body", "creator": {"name": "Yigit Polat", "id":"123"}, "leader": {"name": "Guray Baydor", "id": "321"}, "members": [{"name": "Emre Kutlu", "id": "1"}, {"name": "Esat Kibrit", "id": "2"}], "date": "11/02/1995" }
                //{"details": {"justification": "","costs": [{name:"ps4 kolu",cost: 150},{name:"KABLO",cost: 200}],"influenceArea": "","timeline": [],"boxlink": "","Status": -1},"votes": [],"title": this.title, "body": this.description, "creator": {"name": "Yigit Polat", "id":"111111"}, "leader": {}, "members": [{"name": "Emre Kutlu", "id": "1", "timestamp" : new Date()}, {"name": "Esat Kibrit", "id": "2","timestamp" : new Date()}], "date": new Date(), "isActive": true })
            },
            async getCreatorID(){
                let result = await axios({
                    method: 'GET',
                    url: `${process.env.VUE_APP_BACKENDURL}/getAllAttributes`,
                    headers: {'Access-Control-Allow-Origin': '*'},
                    withCredentials : true
                });
                // Don't forget to return something
                return result.data
            }
        },
        components:{
            countdown
        },
        name: 'ideaform'
    }
</script>
