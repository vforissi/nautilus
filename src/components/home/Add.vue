<template>
    <div id="all">
        <h3>Add new applicant</h3>
        <input v-model="candidate" placeholder="email"/>
        <button @click="createLink">add candidate</button>
        <p v-for="(candidate, index) in addedCandidates" :key="index">✅ {{ candidate }}</p>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
    data() {
        return {
            candidate: '',
            addedCandidates: [],
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
                            for (let i = 0; i < this.links.length; i++) {
                                if (this.links[i] === doc.get('uid')) {
                                    alert("You already added this applicant.")
                                    added = true;
                                }
                            }
                            if (!added) {
                                const link = { institution: uid, candidate: doc.get('uid') };
                                linkRef.add(link)
                                    .then((doc) => {
                                        linkRef.doc(doc.id).update({ docId: doc.id })
                                    })
                                this.links.push(doc.get('uid'));
                                this.addedCandidates.push(this.candidate);
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
                        }
                        firebase.auth().sendSignInLinkToEmail(this.candidate, actionCodeSettings);
                        this.addedCandidates.push(this.candidate);
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
    }
    p {
        color: rgb(0, 190, 0);
    }
</style>
