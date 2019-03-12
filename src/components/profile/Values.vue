<template>
    <div>
        <h1 class="mt-5">Values</h1>
        <!-- institutions filled-->
        <div v-if="!editable && values.list" class="box">
            <div class="instance" v-for="(item, index) in values.list" :key="index">
                <h4>{{' N.' + (index + 1) + ' ' + item.value }} - {{Math.round((item.score / 70) * 100) }} %</h4>
                <p>{{valueDesc[item.value]}}</p>
                <p v-if="valueRules.text">For me to attain my value,<br> <strong>{{}}</strong></p>
            </div>
            <div class="instance trans"/>
        </div>
        <!-- institution empty  -->
        <div v-else-if="!editable && !values.list" class="box empty">
            <h3>The applicant hasn't answered his values yet.</h3>
        </div>
        <!-- users empty -->
        <div v-else-if="editable && !values.list" class="box empty column">
            <b-button class="modalButton" @click="showModal">Do the value assessment </b-button>
            <b-modal ref="myModalRef" hide-footer :title="'Value Index - ' + Math.round(this.valueRes.stage / 10 * 100) + '%'">
                <ValueTest @hide="hideModal"/>
            </b-modal>
            <h5 v-if="msgRes" class="saved_msg">✅ results saved</h5>
        </div>
        <!-- users filled -->
        <div v-if="editable && values.list" class="box">
            <div class="instance" v-for="(item, index) in values.list" :key="index">
                <h4>{{' N.' + (index + 1) + ' ' + item.value }} - {{Math.round((item.score / 70) * 100) }} %</h4>
                <p>{{valueDesc[item.value]}}</p>
                <p v-if="valueRules.text">For me to attain my value,<br> <strong>{{/*add rule*/}}</strong></p>
            </div>
            <div class="instance trans"/>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import ValueTest from '@/components/tests/ValueTest.vue'

export default {
    components: {
        ValueTest
    },
    data() {
        return {
            valueDesc: {
                'Aesthetic': 'Form, Harmony, Beauty, Balance',
                'Economic': 'Money, Practical results, Return',
                'Individualistic': 'Independence, Uniqueness',
                'Political': 'Control, Power, Influence',
                'Altruistic': 'Altruism, Service, Helping others',
                'Regulatory': 'Structure, Order, Routine',
                'Theoretical': 'Knowledge, Understanding',
            },
            msg: false,
            msgRes: false,
            values: Object(),
            valueRules: Object(),
            valueRes: { stage: 0 },
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
    created() {
        const valuesRef = firebase.firestore().collection("values");
        const valuesResRef = firebase.firestore().collection("valueRes");

        valuesRef.doc(this.uid).onSnapshot((doc) => {
            if (doc.exists) {
                this.values = doc.data();
            }
        })
        valuesResRef.doc(this.uid).onSnapshot((doc) => {
            if (doc.exists) {
                this.valueRes = doc.data();
            }
        })
        // get value rules ?
    },
    methods: {
        rmv: function () {
            this.msg = false;
            this.msgRes = false;
        },
        showModal() {
            this.$refs.myModalRef.show()
        },
        hideModal() {
            this.$refs.myModalRef.hide()
            this.msgRes = true;
            setTimeout(() => {
                this.rmv();
            }, 3000)
        }
    }
}
</script>

<style scoped>
    h4 {
        text-align: left;
    }
    p {
        
        text-align: left;
    }
    .box {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 10px;
        margin: 20px 0px;
        background-color: #f7f7f7;
    }
    .column {
        flex-direction: column;
    }
    .instance {
        width: 70%;
        margin: 20px 0px;
        padding: 20px 40px;
        background-color: white;
        border: 1px solid #f7f7f7;
    }
    .trans{
        background-color: #f7f7f7;
    }
    .empty {
        padding: 150px;
    }
    .empty h3 {
        padding: 10px;
        margin: 40px;
    }
    .saved_msg {
        color: rgb(0, 190, 0);
        margin: 20px;
    }
</style>
