<template>
    <div>
      <div  id="nav">
        <div class="logo">
          <img class="logoImg" alt="nautilus icon" src="@/assets/logo.jpg" @click="redirect('/')"/>
          <h1 class="title" @click="redirect('/')">NAUTILUS</h1>
        </div>
        <div v-if="this.$route.path !== '/invite'">
          <a v-b-modal.modal1>Settings</a>
        </div>
      </div>
      <!-- Modal Component -->
      <b-modal hide-footer id="modal1" title="Settings">
        <div class="popup">
          <label>New Email :<br>
            <input v-model="newEmail" placeholder="New Email"/>
          </label>
          <label>Password :<br>
            <input v-model="emailPassword" type="password" placeholder="Password"/>
          </label>
          <button @click="save">save</button>
          <h4 v-if="success" class="indic1">saved</h4>
          <h4 v-if="error" class="indic0">error, check twice</h4>
          <p class="email">Send us an email for any reason at:<br><strong>nautilushiring@gmail.com</strong></p>
          <div class="logout" @click="logout">Logout</div>
        </div>
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
          }).catch(() => {
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
    padding: 3px 20px;
    margin: 5px 10px 20px;
    background-color: deepskyblue;
    color: white;
    border: 0px;
    width: 40%;
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
  .email {
    text-align: left;
    margin-top: 20px;
    margin-left: 40px;
  }
  .popup {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
@media only screen and (min-width: 768px) {
  #nav {
    display: flex;

    padding: 10px;
    margin: 10px;
  }
}
  .logout {
    margin-top: 30px;
    font-weight: bold;  
    color: #2c3e50;
    text-decoration: underline;
  }

  .logout:hover {
    cursor: pointer;
  }
  a {
    font-weight: bold;
    color: #2c3e50;
  }
  a:hover {
    cursor: pointer;
  }

  .logo {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .title {
    border: 0px solid deepskyblue;
    background-color: white;
    color: deepskyblue;
    padding: 35px 20px 5px 0px;
    cursor: pointer;
  }
  .logoImg { 
    width:auto;
    max-height:100px;
    cursor: pointer;
  }
</style>
