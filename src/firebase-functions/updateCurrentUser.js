import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const updateCurrentUser = async (data) => {
    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;
    await db.collection("user")
        .doc(uid)
        .update(data)
}

export default updateCurrentUser;