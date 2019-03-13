<template>
    <div>
        <h1>Identity</h1>
        <div v-if="!editable" class="box filled">
            <img v-if="!img" alt="Profile Picture" src="@/assets/pp-icon.png"/>
            <img v-else alt="Profile Picture" :src="img"/>
            <div v-if="identity.Name" class="text_facts">    
                <div v-for="(item, index) in identityModel" :key="index">
                    <p v-if="identity[item]">{{item}} : {{identity[item]}}</p>
                </div>
            </div>
        </div>
        <div v-if="editable" class="box">
            <img v-if="!img" alt="Profile Picture" src="@/assets/pp-icon.png"/>
            <img v-else alt="Profile Picture" :src="img"/>
            <b-form-file
                v-if="!img"
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choose a file..."
                drop-placeholder="Drop file here..."
                class="form_file"
            />
            <div  class="text_inputs">
                <input 
                    v-for="(item, index) in identityModel" 
                    :key="index" 
                    v-model="identity[item]" 
                    :placeholder="item" 
                />
                <button @click="update">save</button>
                <p v-if="msg" class="saved_msg">✅ saved</p>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

export default {
    data() {
        return {
            identity: {'Name': '', 'Age': '', 'Height': '', 'Weight': '', 'Ethnicity': '', 'Nationality': '', 'Gender': '', 'Orientation': '' },
            identityModel: ['Name', 'Age', 'Height', 'Weight', 'Ethnicity', 'Nationality', 'Gender', 'Orientation' ],
            msg: false,
            img: "",
            file: ''
        }
    },
    computed: {
        editable() { 
            return (this.$route.params.id === undefined)
        },
        uid() {
            if (this.$route.params.id === undefined) {
                return firebase.auth().currentUser.uid;
            }  else {
                return this.$route.params.id;
            }
        },
    },
    watch: {
        file: function () {
            const identityRef = firebase.firestore().collection("identity").doc(this.uid);
            const storageRef = firebase.storage().ref('images/'+ this.uid);
            const userRef = firebase.firestore().collection("user").doc(this.uid);

            storageRef.put(this.file)
            .then(response => {
                response.ref.getDownloadURL().then((url) => {
                    this.img = url;
                    userRef.update({ imgUrl: url })
                    identityRef.update({ imgUrl: url })
                })             
                .catch(err => console.log(err))
            })
        }
    },
    async created() {
        const identityRef = firebase.firestore().collection("identity").doc(this.uid);
        const storageRef = firebase.storage().ref('images/'+ this.uid);
        const user = firebase.auth().currentUser;

        storageRef.getDownloadURL().then((url) => {
            user.updateProfile({
                photoURL: url,
            })
            this.img = url;
        }).catch(err => console.log(err))
        
        let identity = this.identity;
        await identityRef.get().then((doc) => {
            if (doc.exists) {
            const data = doc.data()
            identity = data;
            }
        })
        this.identity = identity;
    },
    methods: {
        update: function () {
            console.log(this.identity)
            const identityRef = firebase.firestore().collection("identity");

            identityRef.doc(this.uid).set(this.identity)
            this.msg = true;
            setTimeout(() => {
                this.rmv();
            }, 3000)
            
        },
        rmv: function () {
            this.msg = false;
        }
    }
}
</script>

<style scoped>
    .form_file {
        flex: 2;
        width: 80%;
    }
    img {
        flex: 1;
        padding: 10px 10px;
        margin: 20px 60px;
        max-width: 20%; 
        height: auto;
        border: 1px solid lightgrey;
        background-color: white;
    }
    p {
        text-align: left;
    }
    .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        width: 100%;
        background-color: #f7f7f7;
    }
    .text_inputs {
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        padding: 10px;
        margin: 10px 40px;
        background-color: #f7f7f7;
        height: 100%;
        width: 100%;
    }
    .text_facts {
        background-color: white;
        padding: 20px 50px;
        margin: 20px 0px 30px;
    }
    input {
        width: 50%;
        margin: 5px;
    }
    button {
        padding: 2px 40px;
        margin: 5px;
        text-align: center;
        color: white;
        border: 0px;
        background-color: deepskyblue;
    }
    .saved_msg {
        color: rgb(0, 190, 0);
        margin: 5px;

    }

@media only screen and (max-width: 768px) {
    img {
        flex: 1;
        padding: 10px 10px;
        margin: 20px 60px;
        max-width: 60%; 
        height: auto;
        border: 1px solid lightgrey;
        background-color: white;
    }
}
@media only screen and (min-width: 768px) {
    .filled {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
    }
    .form_file {
        flex: 2;
        width: 40%;
    }
    input {
        width: 18%;
        margin: 5px;
    }
}
</style>
