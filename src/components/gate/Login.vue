<template>
    <div class="login">
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="login">Log In</button>
        <br>
        <span v-b-modal.modal1 class="reset">Forgot password</span>
        <b-modal hide-footer id="modal1" title="Reset Password">
            <input v-model="email" placeholder="Email"/>
            <b-button class="m-4" @click="sendResetLink">Send</b-button>
            <h4 v-if="success" class="indic1">sent</h4>
            <h4 v-if="error" class="indic0">error in email</h4>
        </b-modal>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            success: 0,
            error: 0,
        };
    },
    methods: {
        login: function() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    this.$router.replace('/')
                    return user;
                },
                (err) => {
                    alert('Oops. ' + err.message);
                }
            )
        }, 
        sendResetLink: async function() {
            const auth = firebase.auth();

            await auth.sendPasswordResetEmail(this.email)
            .then(() => {
                // Email sent.
                this.success = 1;
            }).catch((error) => {
                // An error happened.
                console.log(error)
                this.error = 1; 
            });
            this.email = '';
            setTimeout(() => { 
                this.error = 0;
                this.success = 0
            }, 3000)
        }
    }
}
</script>

<style scoped>
    .login {
        padding-top: 10px;
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
    span {

        text-decoration: underline;
        font-size: 13px;
        cursor: pointer;
    }
    .indic1 {
        color: rgb(0, 199, 0);
        text-align: left;
        padding: 0px;
        margin: 0px 0px 0px 5px;
    }
    .indic0 {
        color: rgb(199, 0, 0);
        text-align: left;
        padding: 0px;
        margin: 0px 0px 0px 5px;
    }
</style>
