<template>
    <div id="nav">
      <div class="logo" @click="redirect('/')">
        <img class="logoImg" alt="nautilus icon" src="@/assets/logo.jpg"/>
        <h1 class="title">NAUTILUS</h1>
      </div>
      <div v-if="this.$route.path !== '/invite'">
        <a v-b-modal.modal1>Settings</a>
        <br>
        <a @click="logout">Logout</a>
      </div>
      <!-- Modal Component -->
      <b-modal hide-footer id="modal1" title="Settings">
          <input v-model="newEmail" placeholder="New Email"/>
          <input v-model="emailPassword" type="password" placeholder="Password"/>
          <button @click="save">save</button>
          <h4 v-if="success" class="indic1">saved</h4>
          <h4 v-if="error" class="indic0">error, check twice</h4>
        </b-modal>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      emailPassword: '',
      newEmail: '',
      success: 0,
      error: 0,
    }
  },
  methods: {
      logout: function() {
          firebase.auth().signOut().then(() => {
              this.$router.replace('gate')
          });
      },
      redirect: function(root) {
          this.$router.push(root);
      },
      save: async function() {
        const user = firebase.auth().currentUser;
        
        await user.reauthenticateAndRetrieveDataWithCredential(
          firebase.auth.EmailAuthProvider.credential(user.email, this.emailPassword))
          .then(() => {
            // User re-authenticated.
            user.updateEmail(this.newEmail)
              .then(() => {
              this.success = 1;
            }).catch((error) => console.log(error))
          }).catch((error) => {
            // An error happened.
            this.error = 1;
          });  
        setTimeout(() => {
            this.success = 0;
            this.error = 0;
          }, 3000)
      }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
input {
 padding: 5px;
 margin: 5px;
}
button {
  padding: 5px 10px;
  margin: 5px;
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
#nav {
  display: flex;

  padding: 10px;
  margin: 10px;
}

#nav a {
  font-weight: bold;  
  color: #2c3e50;
}

#nav span {
  padding: 5px;
}

#nav a:hover {
  text-decoration: underline;
  cursor: pointer;

}

#nav a.router-link-exact-active {
  color: deepskyblue;
}

.logo {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
}
.title {
  border: 0px solid deepskyblue;
  background-color: white;
  color: deepskyblue;
  padding: 35px 20px 5px 0px;
}
.logoImg { 
  width:auto;
  max-height:100px;
}
</style>
