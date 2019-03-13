<template>
    <div id="all">
        <h3>Add new applicant</h3>
        <input v-model="candidate" placeholder="email"/>
        <button @click="createLink">add applicant</button>
        <p v-if="addedCandidate" :key="index">✅ {{ addedCandidate }}</p>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { setTimeout } from 'timers';

export default {
    data() {
        return {
            candidate: '',
            addedCandidate: '',
        }
    },
    computed: {
        links() {
            return this.$store.state.links
        }
    },
    methods: {
        createLink: function() {
            const uid = firebase.auth().currentUser.uid;
            const userRef = firebase.firestore().collection("user");
            const linkRef = firebase.firestore().collection("link");
            const actionCodeSettings = { url: window.location.origin + '/invite', handleCodeInApp: true}
            
            if (!this.candidate)
                return;
            userRef.where("email", "==", this.candidate).get()
                .then((docs) => {
                    let added = false;
                    // if applicant is already registered, simply add
                    if (!docs.empty) {
                        docs.forEach((doc) => {
                            const user = doc.data()

                            for (let i = 0; i < this.links.length; i++) {
                                if (this.links[i] === user.uid) {
                                    alert("You already added this applicant.")
                                    added = true;
                                }
                            }
                            if (!added) {
                                const link = { institution: uid, candidate: user.uid };
                                linkRef.add(link)
                                    .then((doc) => {
                                        linkRef.doc(doc.id).update({ docId: doc.id })
                                    })
                                this.links.push(user.uid);
                                this.addedCandidate = this.candidate + ' invited';
                                setTimeout(() => {this.addedCandidate = ''}, 3000)
                                // add addded applicant to store
                                let applicants = this.$store.state.applicants
                                applicants.push(user)
                                this.$store.commit("set_applicants", applicants)
                            }
                        })
                        this.candidate = '';
                    // if applicant doesn't have an account, send invite
                    } else {
                        for (let i = 0; i < this.links.length; i++) {
                            if (this.links[i] === this.candidate) added = true;
                        }
                        if (!added) {
                            const link = { institution: uid, candidate: this.candidate };
                            linkRef.add(link)
                                .then((doc) => {
                                    linkRef.doc(doc.id).update({ docId: doc.id })
                                })
                            this.links.push(this.candidate);
                            // add invite to store (applicants)
                            let applicants = this.$store.state.applicants
                            applicants.push(this.candidate)
                            this.$store.commit("set_applicants", applicants)
                            this.addedCandidate = this.candidate + ' invited';
                            firebase.auth().sendSignInLinkToEmail(this.candidate, actionCodeSettings);
                        } else {
                            this.addedCandidate = this.candidate + ' invited again';
                            firebase.auth().sendSignInLinkToEmail(this.candidate, actionCodeSettings);
                        }
                        // reset v-model
                        this.candidate = '';
                    }
                })
        }
    }
}
</script>

<style scoped>
    #all {
        text-align: left;
        margin: 20px 100px;
    }
    input {
        padding: 10px;
        margin-bottom: 30px;
        width: 80%;
    }
    button {
        padding: 10px;
        margin-left: 10px;
        background-color: deepskyblue;
        color: white;
        border: 0px;
    }
    p {
        color: rgb(0, 190, 0);
    }
    @media only screen and (max-width: 768px) {
        #all {
            text-align: left;
            margin: 20px 50px;
        }
        input {
            padding: 10px;
            margin-bottom: 10px;
            width: 100%;
        }
        button {
            padding: 10px;
            margin-left: 0px;
        }
    
    }
</style>
