<template>
    <div>
        <div v-for="(applicant, index) in applicants" :key="index">
            <div v-if="typeof applicant === 'object'" class="card">
                <img alt="Profile Picture" src="@/assets/pp-icon.png"/>
                <p>{{ applicant.name }}</p>
            </div>
            <div v-else-if="typeof applicant === 'string'" class="card">
                <p>{{ applicant }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: { 
        applicants() {
            console.log(this.$store.state.applicants)
            return this.$store.state.applicants
        }
    }
}
</script>

<style scoped>
    .card {
        display: flex;
        flex-direction: row;
    }
    .card>img {
        width: 50%; 
        height: auto;
    }
</style>
