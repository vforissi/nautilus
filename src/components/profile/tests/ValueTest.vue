<template>
    <div>
        <div class="d-block text-center">
            <div v-if="stage < 10">    
                <p class="text">{{
                    //quest[stage]
                    list[stage].title
                    }}</p>
                <div class="levels">  

                    <draggable
                        class="list-group"
                        tag="ul"
                        v-model="list[stage].items"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                    >
                        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                            <li
                                class="list-group-item"
                                v-for="element in list[stage].items"
                                :key="element.value"
                            >
                            <i
                            :class="
                                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
                            "
                            @click="element.fixed = !element.fixed"
                            aria-hidden="true"
                            ></i>
                            {{ element.text }}
                        </li>
                        </transition-group>
                    </draggable>

                </div>
            </div>
            <p v-if="stage >= 10">
                You finished the test!
            </p>
        </div>
        <div class="d-flex">
            <b-button v-if="stage < 10" class="m-3" variant="success" block @click="prev">
                Previous
            </b-button>
            <b-button class="m-3" variant="success" block @click="save">
                <span v-if="stage < 10">Next</span>
                <span v-else>Save</span>
            </b-button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import draggable from 'vuedraggable'
import TestData from './ValueTestData.js'

export default {
    components: {
        draggable,
    },
    data() {
        return {
            answers: Array(),
            stage: 0,
            list: Array(),
            drag: false,
        }
    },
    computed: {
        uid() {
            return firebase.auth().currentUser.uid;
        },
         dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },
    created() {
        const valueResRef = firebase.firestore().collection("valueRes");

        valueResRef.doc(this.uid).get().then((doc) => {
            if (doc.exists) {
                const { list, stage } = doc.data();
                this.list = list;
                this.stage = stage;
            } else {
                this.list = TestData
            }
        })
    },
    methods: {
        prev: function () {
            if (this.stage > 0)
                this.stage--;
        },
        save: function () {
            const valueResRef = firebase.firestore().collection("valueRes");

            if (this.stage < 10)
                this.stage++;
            if (this.stage) {
                valueResRef.doc(this.uid).set({ 
                    list: this.list, 
                    stage: this.stage
                });  
            }
            if (this.stage >= 10) {
                let scores = {
                    'Aesthetic': 0,
                    'Economic': 0,
                    'Individualistic': 0,
                    'Political': 0,
                    'Altruistic': 0,
                    'Regulatory': 0,
                    'Theoretical': 0
                }
                
                for (let i = 0; i < 10; i++) {
                    for(let j = 6; j > -1; j--) {
                        if (this.list[i].items) {
                            scores[this.list[i].items[j].value] += 7 - j;
                        }
                    }
                }
                let arr = [];
                for (let key in scores) {
                    arr.push({ value: key, score: scores[key] }) 
                }
                const len = arr.length;
                for (let i = len - 1; i >= 0; i--) {
                    for(let j = 1; j <= i; j++) {
                        if(arr[j - 1].score < arr[j].score){
                            const temp = arr[j-1];
                            arr[j-1] = arr[j];
                            arr[j] = temp;
                        }
                    }
                }
                firebase.firestore().collection("values").doc(this.uid).set({list: arr})
                this.$emit('hide')
            }
        },
    }
}
</script>

<style scoped>
    .list-group {
        min-height: 20px;
    }
    .list-group-item {
        cursor: move;
    }
    .list-group-item i {
        cursor: pointer;
    }
    .text {
        text-align: justify;
        padding: 10px;
        margin: 10px 30px;
    }
    .levels {
        display: flex;
        justify-content: center;
        margin: 20px 20px 50px;
    }
    
</style>
