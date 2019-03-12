<template>
    <div class="login">
        <h3>Sign in</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="login">Connection</button>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
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
        }
    }
}
</script>

<style scoped>
    .login {
        padding-top: 20px;
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
    a {
        color: black;
        text-decoration: underline;
    }
</style>
