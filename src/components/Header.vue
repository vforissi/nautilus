<template>
    <div id="nav">
      <div class="logo">
        <img class="logoImg" alt="nautilus icon" src="@/assets/logo.jpg"/>
        <h1 class="title">NAUTILUS</h1>
      </div>
      <div v-if="this.$route.path !== '/invite'">
        <router-link v-if="user.type === 'institution'" to="/">List</router-link>
        <span v-if="user.type === 'institution'">|</span>
        <router-link v-if="user.type === 'institution'" to="/new">New</router-link>
        <span v-if="user.type === 'institution'">|</span>
        <a @click="logout">Logout</a>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  beforeCreate() {
  },
    methods: {
        logout: function() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('gate')
            });
        },
        redirect: function(root) {
            this.$router.push(root);
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

#nav {
  padding: 30px;
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
  margin-top: 10px;
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
