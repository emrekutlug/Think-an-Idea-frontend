<template>
    <div class="row card" style="margin: 0px;margin-bottom:20px">
        <div class="card-header">
            <input v-if = "editIdea" v-model = "editedTitle" v-on:change="editTitleFunc">
            <div v-else>
                <label> {{vueTitle}} </label>
            </div>
   </div>
   <div class="card-body">
       <input v-if = "editIdea" v-model = "editedBody" v-on:change="editBodyFunc">
       <div v-else>
           <label> {{vueBody}} </label>
       </div>
   <br>
   <br>
   <a href="#" class="btn btn-dark" v-if="leader === null && !checkIfMember() && isActive" @click="becomeProjectLeader">Take Leadership</a>
   <a href="#" class="btn btn-dark" v-if="checkIfLeader()" @click="leaveProjectLeadership() && isActive">Leave Leadership</a>
   <a href="#" class="btn btn-dark" v-if="!checkIfMember() && !checkIfLeader() && isActive" @click="becomeProjectMember()">Become a Project Member</a>
   <a href="#" class="btn btn-dark" v-if="checkIfMember() && isActive" @click="leaveProjectMembership()">Leave Membership</a>
   <a href="#" class="btn btn-dark" v-if="creator.creatorID === this.userID && leader===null && members.length === 0" @click="deleteIdea()">Delete</a>
      <!-- This is available when idea is deactivated-->
        <a href="#" class="btn btn-dark" v-if="creator.creatorID === this.userID && !isActive && !editIdea" @click="edit">Edit</a>
        <a href="#" class="btn btn-dark" v-if="creator.creatorID === this.userID && !isActive && editIdea" @click="saveIdea">Save</a>
        <!-- user can de-active the idea with this button -->
        <br>
        <br>
        <label for="InputTitle" v-if="!isActive">This Idea is deactivated</label>
        <br>
        <label for="InputTitle" v-if="!isActive">Reason: {{reason}}</label>
        <input type="text" v-model="deactivationReason" class="form-control"
            id="InputTitle" placeholder="Enter Deactivation Reason" v-if="isActive && isAdmin">
        <br>
        <a href="#" class="btn btn-dark"  @click="deactivateIdea()"  v-if="isActive && isAdmin">Deactivate</a>


        <br>
        <br>
        <p class="card-text">
            <small class="text-muted" style="font-size: 15px;">Created by {{getCreatorName(creator.id)}} </small>
            <small class="text-muted" style="font-size: 15px;" v-if="leader!==null">Lead by {{getLeaderName(leader)}} </small>
            <br>
            <small class="text-muted" style="font-size: 15px;"> Members: {{getMembersName()}}</small>
            <br> 
            <br> 
            <small class="text-muted" style="font-size: 15px;">{{date}}</small>
        </p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        // creator.id prop refers creatorid
        props: ['cardID','title', 'body', 'leader', 'creator', 'members', 'date', 'isActive', 'reason', 'userDetails','getFunction'],
        data() {
            return {
                deactivationReason: null,
                userID: null,
                userName: null,
                isAdmin: null,
                editedTitle: '',
                editedBody: '',
                editIdea: false,
                vueTitle: this.title,
                vueBody: this.body,
            }
        },
        methods: 
        {
            editTitleFunc(e) {
                this.editedTitle = e.target.value;
            },
            editBodyFunc(e) {
                this.editedBody = e.target.value;
            },
            saveIdea(e){
                e.preventDefault();
                this.editIdea = !this.editIdea;
                this.vueTitle = this.editedTitle;
                this.vueBody = this.editedBody;

                axios
                    .put(`${process.env.VUE_APP_BACKENDURL}/idea/updateIdea`,
                        {id: this.cardID,title: this.editedTitle,body: this.editedBody, isActive: true})
                    .then(response => {
                        this.getFunction()
                    })
                    .catch(error => {
                        alert(error);
                        this.vueTitle = this.title;
                        this.vueBody = this.body;
                    })

            },
            async edit(e){
                e.preventDefault();
                this.editIdea = !this.editIdea;
            },
            checkIfMember() {
                for (let i = 0; i < this.members.length; i++) {
                    if(this.members[i].memberID === this.userID){
                        return true;
                    } 
                }
            },
            getCreatorName() {
                return (this.creator.creatorID === this.userID) ? 'You' : this.creator.creatorName;
            },
            checkIfLeader() {
                if (this.leader !== null){
                    return this.leader.leaderID === this.userID;
                }

            },
            getLeaderName() {
                if (this.leader !== null){
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
            deleteIdea(){
                event.preventDefault();
                axios
                .delete(`${process.env.VUE_APP_BACKENDURL}/idea/ideas`,
                {params: {id: this.cardID}})
                .then(response => {
                    this.$parent.getFunction()
                }).catch(error =>{
                    alert(error)
                })
            },
            becomeProjectMember(){
                event.preventDefault();
                axios
                .put(`${process.env.VUE_APP_BACKENDURL}/idea/becomeProjectMember`,
                {id: this.cardID, member: {memberID: this.userID, memberName: this.userName}})
                .then(response => {
                    this.$parent.getFunction()
                }).catch(error =>{
                    alert(error)
                })
            },
            leaveProjectMembership(){
                event.preventDefault();
                axios
                .put(`${process.env.VUE_APP_BACKENDURL}/idea/leaveProjectMembership`,
                {id: this.cardID, member: {memberID: this.userID, memberName: this.userName}})
                .then(response => {
                    this.$parent.getFunction()
                }).catch(error =>{
                    alert(error)
                })
            },
            becomeProjectLeader(){
                event.preventDefault();
                axios
                .put(`${process.env.VUE_APP_BACKENDURL}/idea/becomeProjectLeader`,
                {id: this.cardID, leader: {leaderID: this.userID, leaderName: this.userName}})
                .then(response => {
                    this.$parent.getFunction()
                }).catch(error =>{
                    alert(error)
                })
            },
            leaveProjectLeadership(){
                event.preventDefault();
                axios
                .put(`${process.env.VUE_APP_BACKENDURL}/idea/leaveProjectLeadership`,
                {id: this.cardID})
                .then(response => {
                    this.$parent.getFunction()
                }).catch(error =>{
                    alert(error)
                })
            },
            deactivateIdea(){
                event.preventDefault();
                axios
                .put(`${process.env.VUE_APP_BACKENDURL}/idea/deactivateIdea`,
                {id: this.cardID, reason: this.deactivationReason})
                .then(response => {
                    this.deactivationReason = null;
                    this.$parent.getFunction()
                }).catch(error =>{
                    alert(error)
                })
            }
        },
        created: async function(){
            this.userID = this.userDetails.userID;
            this.userName = this.userDetails.userName;
            this.isAdmin = this.userDetails.isAdmin;
            this.editedTitle = this.title;
            this.editedBody = this.body

        },
        beforeUpdate() {
            this.vueTitle = this.title;
            this.vueBody = this.body;
        }
    }
    
</script>

<style>
    .btn-dark {
        margin-right: 10px;
    }
</style>