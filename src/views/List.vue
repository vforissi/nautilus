<template>
    <div>
        <h1>{{user.type}}</h1>
        <Profile v-if="user.type === 'candidate'"/>
        <div v-else>
            The list!!!
        </div>
    </div>
</template>

<script>
import Profile from './Profile.vue'

export default {
    components: {
        Profile
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    }
}
</script>

<style scoped>
    
</style>
