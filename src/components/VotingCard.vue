<template>
    <div class="row card" style="margin: 0px;margin-bottom:20px ">
        <div class="card-header ">
            <div style="float: left;">
                <h5>{{ title }}</h5>
            </div>
            <div class="custom-radios" style="float:right">
                <div>
                    <input type="radio" id="color-1" name="color" value="color-1" @click="voteIdea()">
                    <label for="color-1">
                        <span></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="card-body">
            <p class="card-text">{{body}}</p>
            <br>
            <h5 class="card-title">Current Votes: {{details.votes}}</h5>
            <button class="btn btn-dark" type="button" style="font-size: 20px" @click="toggleDetail()">Details</button>
            <button class="btn btn-dark" type="button" style="font-size: 20px" v-if="checkIfLeader()">Edit</button>
            <br>
            <br>
            <br>
            <div :id="cardID" v-if="showDetail">
                <li class="list-group-item"><p class="card-text"><b>Justification:</b> {{details.justification}}</p>
                </li>
                <li class="list-group-item"><p class="card-text"><b>Influence Area: </b>{{details.influenceArea}}</p>
                </li>
                <li class="list-group-item">
                    <p class="card-text">
                        <b>Costs: </b>
                    </p>

                    <ul id="horizontalList">
                        <div v-if="!details.costs.length">
                            <li v-for="cost in details.costs" :key="cost.name">
                                {{cost.name}} : ${{cost.cost}}
                            </li>
                        </div>
                    </ul>

                    <p class="card-text">
                        <b>Total Cost: {{getTotalCost(details.costs)}}</b>
                    </p>

                </li>
                <li class="list-group-item"><p class="card-text"><b>Creator: </b>{{getCreatorName(creator.id)}}</p></li>
                <li class="list-group-item"><p class="card-text"><b>Leader: </b>{{getLeaderName(leader)}}</p></li>
                <li class="list-group-item"><p class="card-text"><b>Members: {{getMembersName()}} </b></p></li>
                <li class="list-group-item"><p class="card-text"><b>Timeline: </b>{{details.timeline}}</p></li>
                <li class="list-group-item"><p class="card-text"><b>Box Link: </b>{{details.boxlink}}</p></li>
                <li class="list-group-item"><p class="card-text"><b>Status: </b>{{details.status}}<br></p></li>
                <br>
                <div class="btn-group dropright">
                    <button type="button" class="btn btn-secondary dropdown-toggle btn btn-dark" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        Update Status
                    </button>

                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">1</a>
                        <a class="dropdown-item" href="#">2</a>
                        <a class="dropdown-item" href="#">3</a>
                    </div>
                </div>

                <br>
                <br>
                <h5 class="card-title">Completion Percentage</h5>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 10%"
                         aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
                <br>
                <p class="card-text">
                    <small class="text-muted">{{date}}</small>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: ['cardID', 'title', 'body', 'leader', 'creator', 'members', 'date', 'details', 'votes', 'userDetails', 'getFunction'],
        data() {
            return {
                userID: null,
                userName: null,
                isAdmin: null,
                showDetail: false,
            }
        },
        mounted() {
            this.getFunction();
        },
        methods:
            {
                /*
                voteIdea(){
                    let user = {
                        id: "12345678",
                        name: "Güray Baycan",
                        vote: ""
                    };

                    axios({
                        method: "post",
                        url: 'http://localhost:1234/voting/voteIdea',
                        params: {id: this.cardID},
                        data: user,
                    }).then(response => {
                        const getFunction = this.getFunc();
                        getFunction();
                        console.log(response.data)
                    }).catch(error =>{
                        console.log(error)
                    });
                },

                 */
                toggleDetail() {
                    this.showDetail = !this.showDetail;
                },
                checkIfMember() {
                    for (let i = 0; i < this.members.length; i++) {
                        if (this.members[i].memberID === this.userID) {
                            return true;
                        }
                    }
                },
                getCreatorName() {
                    return (this.creator.creatorID === this.userID) ? 'You' : this.creator.creatorName;
                },
                checkIfLeader() {
                    //console.log(this.userID);
                    if (this.leader !== null) {
                        return this.leader.leaderID === this.userDetails.userID;
                    }
                    return false;
                },
                getLeaderName() {
                    if (this.leader !== null) {
                        return (this.leader.leaderID === this.userID) ? 'You' : this.leader.leaderName;
                    }
                },
                getMembersName() {
                    const memberList = [];
                    for (let i = 0; i < this.members.length; i++) {
                        if (this.members[i].memberID === this.userID) {
                            memberList.push('You');
                        } else {
                            memberList.push(this.members[i].memberName);
                        }
                    }
                    return memberList.join(', ');
                },
                getTotalCost(costsObject) {
                    let sum = 0;
                    //console.log(costsObject)
                    for (let cost in costsObject) {
                        //console.log(cost)
                        console.log(this.cardID);
                        sum += costsObject[cost].cost;
                    }
                    return sum;
                },
            },

        created() {
            console.log(this.userDetails.userID);
            this.userID = this.userDetails.userID;
            this.userName = this.userDetails.userName;
            this.isAdmin = this.userDetails.isAdmin;
            //this.editedTitle = this.title;
            //this.editedBody = this.body
        },
    }


</script>
<style>

    #ideaCard {
        max-width: 100%;
    }

    ul#horizontalList li {
        display: inline;
    }

    html, body {
        height: 100%;
        width: 100%;
        margin: 0;
    }


    .custom-radios div {
        display: inline-block;
    }

    .custom-radios input[type="radio"] {
        display: none;
    }

    .custom-radios input[type="radio"] + label {
        color: #333;
        font-family: Arial, sans-serif;
        font-size: 14px;
    }

    .custom-radios input[type="radio"] + label span {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin: -1px 4px 0 0;
        vertical-align: middle;
        cursor: pointer;
        border-radius: 50%;
        border: 2px solid #FFFFFF;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
        background-repeat: no-repeat;
        background-position: center;
        text-align: center;
        line-height: 44px;
        background-color: rgba(200, 99, 76, 0.76);
    }

    .custom-radios input[type="radio"] + label span img {
        opacity: 0;
        transition: all .3s ease;
        background-color: #2ecc71;
    }

    .custom-radios input[type="radio"]:checked + label span {
        opacity: 1;
        background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg) center center no-repeat;
        width: 40px;
        height: 40px;
        display: inline-block;
        background-color: #2ecc71;
    }

    .custom-radios.checked + label span {
        opacity: 1;
        background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg) center center no-repeat;
        width: 40px;
        height: 40px;
        display: inline-block;
        background-color: #2ecc71;
    }
</style>
