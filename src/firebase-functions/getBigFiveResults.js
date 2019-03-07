import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const getBigFiveResults = async (uid) => {
    let data = Array();
    const db = firebase.firestore();
    await db.collection("bigFiveResults")
        .orderBy('creationTimestamp', 'desc')
        .where('uid', '==', uid)
        .limit(1)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    data = doc.data().scales;                            
                });
            }
        });
    return data;
}

export default getBigFiveResults;