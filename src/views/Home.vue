<template>
    <div>
        <Profile v-if="user.type === 'candidate'"/>
        <div v-else>
            <Add />
            <Cards/>
        </div>

    </div>
</template>

<script>
import Profile from './Profile.vue'
import Cards from '@/components/home/Cards.vue'
import Add from '@/components/home/Add.vue'

export default {
    components: {
        Profile,
        Cards,
        Add
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
