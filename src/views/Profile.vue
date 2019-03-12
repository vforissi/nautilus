<template>
    <div>
        <Identity />
        <Values />
        <Character />
        <!--<Worldview />-->
    </div>
</template>

<script>
import Identity from '@/components/profile/Identity.vue'
import Values from '@/components/profile/Values.vue'
import Character from '@/components/profile/Character.vue'
//import Worldview from '@/components/profile/Worldview.vue'

export default {
    components: {
        Identity,
        Values, 
        Character,
        //Worldview
    },
}
</script>

<style scoped>
   
</style>
