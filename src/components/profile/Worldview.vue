<template>
    <div>
        <h3>Worldview</h3>
        <div v-if="!editable && worldview" class="box">
            <div class="instance" v-for="(belief, index) in worldview" :key="index">
                <div v-for="(value, key) in belief" :key="key">
                    <h5 v-if="key !== 'selected'">{{value}}</h5>
                </div>
                <div>
                    <p>Applicant selected:</p>
                    <h5><strong>{{ belief.selected }}</strong></h5>
                </div>
            </div>
        </div>
        <div v-else-if="!editable && !worldview" class="box empty">
            <h3>The applicant hasn't answered his worldview yet.</h3>
        </div>
        <!--  add module to input worldview --> 
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
    data() {
        return {
            worldview: null,
            //[{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'},{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'},{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'},{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'},{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'},{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'}], 
            worldviewModel: [],
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
    }
}
</script>

<style scoped>
    h3 {
        text-align: left;
        width: 80%;
        padding: 0px 30px;
        margin: 10px 70px;
    }
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
        margin: 20px 150px;
        background-color: #f7f7f7;
    } 
    .instance {
        width: 45%;
        margin: 30px 0px;
        padding: 20px;
        background-color: white;
        border: 1px solid #f7f7f7;
    }
    .empty {
        padding: 150px;
    }
    .empty h3 {
        padding: 10px;
        margin: 40px;
    }
</style>