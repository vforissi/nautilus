<template>
    <div class="input_div">
        <h3>Register so you can start filling in your profile</h3>
        <input type="text" v-model="name" placeholder="Name"/>
        <input type="text" v-model="email" placeholder="Email"/>
        <p>Please use the email to which we sent you this link.</p>
        <input type="password" v-model="password" placeholder="Password"/>
        <button @click="createUser">Register</button>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
    data() {
        return {
            file: null,
            name: '',
            email: '',
            password: '',
        }
    },
    methods: {
        async createUser() {
            if (!this.user) {
                await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((credentials) => {
                    const uid = credentials.user.uid;
                    let user = {
                        creationTimestamp: Date.now(),
                        name: this.name,
                        type: 'candidate',
                        email: this.email,
                        uid,
                    };
                    firebase.firestore().collection("user").doc(uid).set(user)
                    this.$store.commit('set_user', user);
                    const collectionRef = firebase.firestore().collection("link");
                    collectionRef.where("candidate", "==", this.email).get()
                        .then((docs) => {
                            docs.forEach((doc) => {
                                const data = doc.data();
                                const docId = data.docId;
                                collectionRef.doc(docId).update({ candidate: uid })
                            })
                        })
                    this.$router.replace('/')
                },
                (err) => {
                    alert('Oops. ' + err.message);
                })
            } else {
                alert("You are already registered " + this.user.name + "...")
                this.$router.replace('/gate');
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}
</script>

<style scoped>
    .input_div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .input_div>input {
        width: 80%;
        padding: 10px;
        margin: 10px;
    }
    .input_div>button {
        padding: 10px 20px;
        margin-top: 30px;
        background-color: deepskyblue;
        color: white;
        border: 0px;
        border-radius: 10px;
    }
    
@media only screen and (min-width: 768px) {
    .input_div>input {
        width: 40%;
        padding: 10px;
        margin: 10px;
    }
} 
</style>
