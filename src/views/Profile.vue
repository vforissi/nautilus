<template>
    <div>
        <h3>Identity</h3>
        <div class="box">
            <img alt="Profile Picture" src="@/assets/pp-icon.png"/>
            <div class="text_facts">
                <p>{{identity.name}}</p>
                <p>{{identity.name}}</p>
                <p>{{identity.name}}</p>
                <p>{{identity.name}}</p>
                <p>{{identity.name}}</p>
                <p>{{identity.name}}</p>
                <p>{{identity.name}}</p>
                <p>{{identity.name}}</p>
                <p>{{identity.name}}</p>
                <p>{{identity.name}}</p>
                <p>{{identity.name}}</p>
            </div>
        </div>
        <h3>Values & Rules</h3>
        <div class="box">
            <div class="instance" v-for="(value, index) in [{target: 'valueName', rule:'tralal'},{target: 'valueName', rule:'tralal'},{target: 'valueName', rule:'tralal'},{target: 'valueName', rule:'tralal'},{target: 'valueName', rule:'tralal'},{target: 'valueName', rule:'tralal'},{target: 'valueName', rule:'tralal'},{target: 'valueName', rule:'tralal'},{target: 'valueName', rule:'tralal'},{target: 'valueName', rule:'tralal'},]" :key="index">
                <h4>{{' N.' + (index + 1) + ' ' + value.target }}</h4>
                <p>For me to attain my value,<br> {{value.rule}}</p>
            </div>
        </div>
        <h3>Character</h3>
        <div class="box">
            <div class="instance" v-for="(trait, index) in [{name: 'valueName', score:'X%', desc:'tralal for tralala instead of tralala'},{name: 'valueName', score:'X%', desc:'tralal for tralala instead of tralala'},{name: 'valueName', score:'X%', desc:'tralal for tralala instead of tralala'},{name: 'valueName', score:'X%', desc:'tralal for tralala instead of tralala'},{name: 'valueName', score:'X%', desc:'tralal for tralala instead of tralala'},]" :key="index">
                <h4>{{ trait.name + ' Trait' }}</h4>
                <p>{{trait.desc}}</p>
                <p class="score"><strong>{{trait.score}}</strong></p>
            </div>
        </div>
        <h3>Worldview</h3>
        <div class="box">
            <div class="instance" v-for="(belief, index) in [{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'},{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'},{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'},{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'},{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'},{choice1: 'blabla blabla God exists bla bla bla', choice2:'blabla blabla God is a lie bla bla bla', selected:'blabla blabla God is a lie bla bla bla'}]" :key="index">
                <div v-for="(value, key) in belief" :key="key">
                    <h5 v-if="key !== 'selected'">{{value}}</h5>
                </div>
                <div>
                    <p>Applicant selected:</p>
                    <h5><strong>{{ belief.selected }}</strong></h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
    beforeCreate() {
        const uid = firebase.auth().currentUser.uid;
        const dataRef = firebase.firestore().collection("data");
        const id = this.$route.params.id;

        dataRef.doc(id).get().then((doc) => {
            if (doc.exists) {
                this.data = doc.data()
            }
        })
        if (id === uid)
            this.editable = true;
    },
    data() {
        return {
            editable: false,
            data: Object(),
            identity: {
                name: 'Victorio Malatesta'
            }
        }
    }
}
</script>

<style scoped>
    h3 {
        text-align: left;
        width: 80%;
        padding: 0px 30px;
        margin: 10px 70px;
    }
    h4 {
       
        text-align: left;
    }
    p {
        
        text-align: left;
    }
    .box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 10px;
        margin: 20px 70px;
        background-color: #f7f7f7;
    } 
    .instance {
        width: 45%;
        margin: 30px 0px;
        padding: 20px;
        background-color: white;
        border: 1px solid #f7f7f7;
    }
    .text_facts {
        flex: 3;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 10px;
        margin: 0px 0px;
        background-color: #f7f7f7;
        height: 200px;
    }
    .text_facts p {
        height: 15%;
    }
    img {
        flex: 1;
        padding: 5px 10px;
        margin: 5px 60px;
        max-width: 20%; 
        height: auto;
        border: 1px solid lightgrey;
        background-color: white;
    }
    .score {
        font-size:40px;
    }
</style>
