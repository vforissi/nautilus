<template>
    <div>
        <h1 v-if="user.type === 'institution'">Applicant List</h1>
        <Profile v-if="user.type === 'candidate'"/>
        <Cards v-else/>
    </div>
</template>

<script>
import Profile from './Profile.vue'
import Cards from '@/components/Cards.vue'

export default {
    components: {
        Profile,
        Cards
    },
    computed: {
        user() {
            return this.$store.state.user
        },
    }
}
</script>

<style scoped>
    
</style>
