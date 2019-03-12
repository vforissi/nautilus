<template>
    <div>
        <div v-for="(applicant, index) in applicants" :key="index" @click="openProfile(applicant)">
            <div v-if="typeof applicant === 'object'" class="card">
                <img v-if="applicant.imgUrl" alt="Profile Picture" :src="applicant.imgUrl"/>
                <img v-else alt="Profile Picture" src="@/assets/pp-icon.png"/>
                <div class="text">
                    <p>{{ applicant.name }}</p>
                </div>
            </div>
            <div v-else-if="typeof applicant === 'string'" class="card">
                <img alt="Profile Picture" src="@/assets/pp-icon.png"/>
                <div class="text">
                    <p><strong>{{ applicant }} - invitation sent</strong></p>
                    <p class="why">This applicant hasn't created a profile yet.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: { 
        applicants() {
            return this.$store.state.applicants
        },
    },
    data() {
        return {
            applicantsData: {}
        }
    },
    methods: {
        openProfile: function(applicant) {
            if(typeof applicant === 'string')
                this.$router.push('/profile/random')
            else {
                this.$router.push('/profile/' + applicant.uid)
            }
        }, 
    }
}
</script>

<style scoped>
    .card {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        margin: 40px 0px;
        background-color: #f7f7f7;
        cursor: pointer;
        border: 0px;
    }
    img {
        flex: 1;
        padding: 5px 10px;
        margin: 5px 60px;
        max-width: 15%; 
        height: auto;
        border: 1px solid lightgrey;
        background-color: white;
    }
    p {
        margin: 10px 40px 10px 30px;
        font-size: 20px;
    }
    .text {
        flex: 4;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .why {
        font-size: 18px;
        margin-top: 0px;
    }
</style>
