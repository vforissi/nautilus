<template>
    <div class="sign-up">
        <h3>Create an account</h3>
        <p class="mb-2">Want to use Nautilus ? Who are you ?</p>
        <div v-if="type === 'institution'" class="nav">
            <span class="type selected">Company</span>
            <span class="type" @click="type='candidate'">Applicant</span>
        </div>
        <div v-if="type === 'candidate' " class="nav">
            <span class="type" @click="type='institution'">Company</span>
            <span class="type selected">Applicant</span>
        </div>
        <input v-if="type === 'candidate'" type="text" v-model="name" placeholder="Name">
        <input v-if="type === 'institution'" type="text" v-model="name" placeholder="Company">
        <input type="text" v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="signUp">Sign Up</button>
        <br>
        <b-button class="modalButton" @click="showModal">Get called by our team</b-button>
        <b-modal ref="myModalRef" hide-footer title="Call us for any reason">
            <div class="d-block text-center">
                <VueTelInput 
                    v-model="phone"
                    :preferredCountries="['us', 'gb', 'fr']"
                />
            </div>
            <button class="call_button" block @click="hideModal">Request call</button>
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
                    this.$router.replace('/')
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
        margin-top: 10px;
        padding-top: 5px;
    }
    input {
        margin: 5px 0;
        width: 70%;
        padding: 5px;
    }
    button {
        padding: 3px 20px;
        margin: 5px 10px 5px;
        background-color: deepskyblue;
        border-radius: 5px;
        color: white;
        border: 0px;
    }
    .call_button {
        width: 100%;
        margin: 0px;
        margin-top: 10px;
    }
    .call_button:hover {
        background-color: rgb(0, 164, 219);
    }
    .nav {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
    }

    .nav span {
        font-weight: bold;
        color: deepskyblue;
        border: 1px solid deepskyblue;
        background-color: white;
        padding: 10px 30px;
        width: 35%;
        cursor: pointer;
    }

    .nav .selected {
        color: white;
        background-color: deepskyblue;
    }
@media only screen and (max-width: 768px) {
    .nav {
        margin: 30px 0px 20px;
    }
    .sign-up {
        margin-top: 50px;
    }
    button {
        margin-top: 20px;
    }
    .modalButton {
        margin-bottom: 30px;
    }
}
</style>
