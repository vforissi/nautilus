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
  import 'firebase/storage'
  import Header from '@/components/Header.vue'

  export default {
    async beforeCreate() {
      const user = firebase.auth().currentUser;
      const db = firebase.firestore();

      if (user) {
        // get user info
        await db.collection("user").doc(user.uid).get()
          .then((doc) => {
          this.$store.commit('set_user', doc.data());
        })

        // get all links btw applicants and institutions
        let links = [];
        await db.collection("link").where("institution", "==", user.uid).get()
          .then((docs) => {
            if (!docs.empty) {
              docs.forEach((doc) => {
                const link = doc.data();
                links.push(link.candidate)
              })
            }
            this.$store.commit("set_links", links)
          })

        // get all applicants and add them to a list for reading
        let applicants = [];
        await this.links.forEach((link) => {
          db.collection("user").doc(link).get()
            .then(async (doc) => {
              let applicant = doc.data();
              if (doc.data() !== undefined) {
                if (!applicant.imgUrl) {
                  applicant.imgUrl = "";
                }
                applicants.push(applicant)
              }
              else 
                applicants.push(link) 
            })
        })
        this.$store.commit("set_applicants", applicants)
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

