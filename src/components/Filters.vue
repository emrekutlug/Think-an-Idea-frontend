<template>
    <div>
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-allIdeas-tab" data-toggle="tab" 
                    href="#nav-allIdeas" role="tab" aria-controls="nav-allIdeas" aria-selected="true" 
                    style="font-size: 20px"
                    @click="setIndex(1)">
                    All Ideas
                </a>
                <a class="nav-item nav-link" id="nav-myIdeas-tab" data-toggle="tab" 
                    href="#nav-myIdeas" role="tab" aria-controls="nav-myIdeas" aria-selected="false" 
                    style="font-size: 20px" @click="setIndex(2)">My Ideas
                </a>
                <a class="nav-item nav-link" id="nav-iMember-tab" data-toggle="tab" 
                    href="#nav-iMember" role="tab" aria-controls="nav-iMember" aria-selected="false" 
                        style="font-size: 20px" @click="setIndex(3)">I Member
                </a>
                <a class="nav-item nav-link" id="nav-iLead-tab" data-toggle="tab" 
                    href="#nav-iLead" role="tab" aria-controls="nav-iLead" aria-selected="false" 
                    style="font-size: 20px" @click="setIndex(4)">I Lead
                </a>
                <a class="nav-item nav-link" id="nav-myVote-tab" data-toggle="tab" 
                    href="#nav-myVote" role="tab" aria-controls="nav-myVote" aria-selected="false" 
                        style="font-size: 20px" v-if="!isIdeaGeneration">My Vote
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        props: {
            isIdeaGeneration: Boolean,
            setIndex: Function
        },
        name : "filters"
    }
</script>