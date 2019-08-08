<!--<div class="row card" style="margin: 0px;margin-bottom:20px ">
                    <div class="card-header">
                    <div style="float:left"><h5>Special title treatment</h5></div>
                    <div style="float:right"><h4 class="ml-auto" style="color: red;">332 Vote</h4></div>
                </div>-->



<template>
    <div class="row card" style="margin: 0px;margin-bottom:20px ">
          <div class="card-header">
                    <div style="float:left"><h5>Special title treatment</h5></div>
                    <div style="float:right"><h4 class="ml-auto" style="color: red;">332 Vote</h4></div>
          </div>
        <div class="card-body">
            <p class="card-text">{{body}}</p>
            <br>
            <div class="accordion" id="accordionExample">

                <button class="btn btn-dark" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style="font-size: 20px">
                    Details<br>
                </button>
                <br>
                <div id="collapseOne" class="collapse " aria-labelledby="headingOne">
                    <li class="list-group-item"><p class="card-text"><b>Justification:</b> {{details.justification}}</p></li>
                    <li class="list-group-item"><p class="card-text"><b>Influence Area: </b>{{details.influenceArea}}</p></li>
                    <li class="list-group-item">
                        <p class="card-text">
                            <b>Costs: </b>
                        </p>

                        <ul id="horizontalList">
                            <li v-for="cost in details.costs" :key="cost.name" >
                                {{cost.name}} : ${{cost.cost}}
                            </li>
                        </ul>

                        <p class="card-text">
                            <b>Total Cost: {{getTotalCost(details.costs)}}</b>
                        </p>

                    </li>
                    <li class="list-group-item"><p class="card-text"><b>Creator: </b>{{creator.name}}</p></li>
                    <li class="list-group-item"><p class="card-text"><b>Leader: </b>{{leader}}</p></li>
                    <li class="list-group-item"><p class="card-text"><b>Members: </b></p>
                        <ul>
                            <li v-for="member in members" :key="member.id" >
                                {{member.name}}
                            </li>
                        </ul>
                    </li>
                    <li class="list-group-item"><p class="card-text"><b>Timeline: </b>{{details.timeline}}</p></li>
                    <li class="list-group-item"><p class="card-text"><b>Box Link: </b>{{details.boxlink}}</p></li>
                    <li class="list-group-item"><p class="card-text"><b>Status: </b>{{details.status}}<br></p></li>
                    <br>
                    <div class="btn-group dropright">
                        <button type="button" class="btn btn-secondary dropdown-toggle btn btn-dark" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            Update Status
                        </button>

                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">1</a>
                            <a class="dropdown-item" href="#">2</a>
                            <a class="dropdown-item" href="#">3</a>
                        </div>
                    </div>

                    <br>
                
                    <!--<h5 class="card-title">Current Votes: {{votes.length}}</h5>-->
                    <br>
                    <br>
                    <p class="card-text">
                        <small class="text-muted">{{date}}</small>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title: String,
            body: String,
            leader: String,
            creator: Object,
            members: Array,
            date: String,
            details: Object,
            votes: Array,
        },

        methods:
            {
                checkIfMember(members) {
                    for (let i = 0; i < members.length; i++) {
                        return members[i].id === 'currentUserID';
                    }
                },
                checkIfCreator(creator, leader) {
                    return creator.ID === 'currentUserID' && leader === null;
                },
                cheackIfLeader(leader) {
                    return leader.ID === 'currentUserID';
                },
                getCreatorName(creator) {
                    return (creator.id === 'currentUserID') ? 'You' : creator.name;
                },
                getLeaderName(leader) {
                    return (leader.id === 'currentUserID') ? 'You' : leader.name;
                },
                getTotalCost(costsObject) {
                    let sum = 0;
                    console.log(costsObject)
                    for (let cost in costsObject) {
                        console.log(cost)
                        sum += costsObject[cost].cost
                    }
                    return sum;
                }
            },
    }


</script>
<style>

    #ideaCard{
        max-width: 100%;
    }

    ul#horizontalList li {
        display:inline;
    }

    html, body {
        height: 100%;
        width: 100%;
        margin: 0;
    }

</style>
