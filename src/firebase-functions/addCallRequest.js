import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const addCallRequest = async (phone) => {

    const db = firebase.firestore();
    await db.collection("callRequests")
        .add({
            phone,
            status: "waiting for call"
        })
}

export default addCallRequest;