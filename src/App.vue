<template>
  <div id="app">
    <Header v-if="this.$route.path !== '/gate'"/>
    <router-view/>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'
  import Header from '@/components/Header.vue'

  export default {
    async beforeCreate() {
      const currentUser = firebase.auth().currentUser;
      const db = firebase.firestore();

      if (currentUser) {
        // get user info
        await db.collection("user").doc(currentUser.uid).get()
          .then((doc) => {
          this.$store.commit('set_user', doc.data());
        })

        // get all links btw applicants and institutions
        await db.collection("link").where("institution", "==", currentUser.uid).get()
          .then((docs) => {
            if (!docs.empty) {
              docs.forEach((doc) => {
                const link = doc.data();
                this.$store.commit("add_link", link.candidate)
              })
            }
          })

        // get all aplicants and add them to a list for reading
        this.links.forEach((link) => {
          db.collection("user").doc(link).get()
            .then((doc) => {
              const applicant = doc.data();
              if (doc.data() !== undefined)
                this.$store.commit("add_applicant", applicant)
              else
                this.$store.commit("add_applicant", link)
            })
        })
      }
    },
    components: {
      Header
    },
    data() {
      return {
        
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      links() {
        return this.$store.state.links
      },
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

