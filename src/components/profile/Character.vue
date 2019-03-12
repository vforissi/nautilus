<template>
    <div>
        <h1>Character</h1>
        <div v-if="!editable && character" class="box">
            <div class="instance" v-for="(trait, index) in character" :key="index">
                <h4>{{ trait.name + ' Trait' }}</h4>
                <p>{{trait.desc}}</p>
                <p class="score"><strong>{{trait.score}}</strong></p>
            </div>
        </div>
        <div v-else-if="!editable && !character" class="box empty">
            <h3>The applicant hasn't answered his character yet.</h3>
        </div>
        <!--  add module to charcter input here --> 
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
    data() {
        return {
            character: null,
            //[{name: 'valueName', score:'X%', desc:'tralal for tralala instead of tralala'},{name: 'valueName', score:'X%', desc:'tralal for tralala instead of tralala'},{name: 'valueName', score:'X%', desc:'tralal for tralala instead of tralala'},{name: 'valueName', score:'X%', desc:'tralal for tralala instead of tralala'},{name: 'valueName', score:'X%', desc:'tralal for tralala instead of tralala'},], 
            characterModel: [],
        }
    },
    computed: {
        editable() { 
            return (this.$route.params.id === undefined)
        },
        uid() {
            if (this.$route.params.id === undefined) {
                return firebase.auth().currentUser.uid;

            }  else {
                return this.$route.params.id;
            }
        }
    },
    created() {
        const identityRef = firebase.firestore().collection("identity");

        identityRef.doc(this.uid).get().then((doc) => {
            if (doc.exists) {
                this.identity = doc.data()
            }
        })
    },
    methods: {
        update: function () {
            const identityRef = firebase.firestore().collection("identity");

            identityRef.doc(this.uid).set(this.identity)
            this.msg = true;
            setTimeout(() => {
                this.rmv();
            }, 3000)
            
        },
        rmv: function () {
            this.msg = false;
        }
    },
}
</script>

<style scoped>
    h4 {
        text-align: left;
    }
    p {
        
        text-align: left;
    }
    .box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 10px;
        margin: 20px 0px;
        background-color: #f7f7f7;
    } 
    .instance {
        width: 45%;
        margin: 30px 0px;
        padding: 20px;
        background-color: white;
        border: 1px solid #f7f7f7;
    }
    .score {
        font-size:40px;
    }
    .empty {
        padding: 150px;
    }
    .empty h3 {
        padding: 10px;
        margin: 40px;
    }
</style>
