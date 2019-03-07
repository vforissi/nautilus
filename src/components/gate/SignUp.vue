<template>
    <div class="sign-up">
        <p>Want to use Nautilus ?</p>
        <div v-if="type === 'institution'" class="nav">
            <span class="type selected">Institution</span>
            <span> | </span>
            <span class="type" @click="type='candidate'">Candidate</span>
        </div>
        <div v-if="type === 'candidate' " class="nav">
            <span class="type" @click="type='institution'">Institution</span>
            <span> | </span>
            <span class="type selected">Candidate</span>
        </div>
        <input v-if="type === 'institution'" type="text" v-model="name" placeholder="Company">
        <input type="text" v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="signUp">Sign Up</button>
        <br>
        <b-button class="modalButton" @click="showModal">Get called by our team</b-button>
        <b-modal ref="myModalRef" hide-footer title="Put in your phone number">
            <div class="d-block text-center">
            <VueTelInput 
                v-model="phone"
                :preferredCountries="['us', 'gb', 'fr']"
            />
            </div>
            <b-button class="mt-3" variant="success" block @click="hideModal">Request call</b-button>
        </b-modal>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import addCallRequest from '@/firebase-functions/addCallRequest.js';

export default {
    name: 'signUp',
    components: {
        VueTelInput
    },
    data() {
        return {
            type: 'institution',
            email: '', 
            password: '',
            name: '',
            phone: '',
        };
    },
    methods: {
        signUp: function() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (credentials) => {
                    const uid = credentials.user.uid;
                    let user = {
                        creationTimestamp: Date.now(),
                        name: this.name,
                        type: this.type,
                        email: this.email,
                        uid,
                    };
                    firebase.firestore().collection("user").doc(uid).set(user)
                    this.$store.commit('set_user', user);
                    this.$router.replace('/list')
                },
                (err) => {
                    alert('Oops. ' + err.message);
                }
            )
        },
        showModal() {
            this.$refs.myModalRef.show()
        },
        hideModal() {
            addCallRequest(this.phone);
            this.$refs.myModalRef.hide()
        }
    }
}
</script>

<style scoped>
    .modalButton {
        background-color: transparent;
        border-color: transparent;
        text-decoration: underline;
        color: black;
        
    }
    .modalButton:hover {
        background-color: transparent;
        border-color: transparent;
        text-decoration: underline;
        color: grey;
    }
    .sign-up {
        margin-top: 20px;
        padding-top: 10px;
    }
    input {
        margin: 10px 0;
        width: 300px;
        padding: 10px;
    }
    button {
        padding: 3px 20px;
        margin: 10px;
    }
    .nav {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav span {
        font-weight: bold;
        color: #2c3e50;
        padding: 10px;
        text-decoration: underline;
        cursor: pointer;
    }

    .nav .selected {
        color: deepskyblue;
    }
</style>
