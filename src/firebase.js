import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: 'AIzaSyBvwqfvBKgclPCn77ekByk1MHqGyWIegNA',
  authDomain: "pantry-tracker-cb334.firebaseapp.com",
  projectId: "pantry-tracker-cb334",
  storageBucket: "pantry-tracker-cb334.appspot.com",
  messagingSenderId: "52570478327",
  appId: "1:52570478327:web:5d8329c9ed0bca05a425f2",
  measurementId: "G-KQ387M2JMB"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Use the already initialized app
}

const db = getFirestore(app);
const auth = getAuth(app);
let analytics;



export { db, auth, analytics };
