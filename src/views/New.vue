<template>
    <div>
        <input v-model="candidate" placeholder="email"/>
        <button @click="createLink">add candidate</button>
        <p v-for="candidate in addedCandidates" :key="candidate">✅ {{ candidate }}</p>
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
                    if (!docs.empty) {
                        docs.forEach((doc) => {
                            linkRef.add({ institution: uid, candidate: doc.get('uid') })
                                .then((doc) => {
                                    linkRef.doc(doc.id).update({ docId: doc.id })
                                })
                        })
                        this.addedCandidates.push(this.candidate);
                        this.candidate = '';
                    } else {
                        linkRef.add({ institution: uid, candidate: this.candidate })
                            .then((doc) => {
                                linkRef.doc(doc.id).update({ docId: doc.id })
                            })
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
    input {
        padding: 10px;
        margin: 10px;
        margin-bottom: 30px;
    }
    button {
        padding: 10px;
    }
    p {
        color: rgb(0, 190, 0);
    }
</style>
