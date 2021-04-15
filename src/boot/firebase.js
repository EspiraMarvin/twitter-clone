import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCH7mekJ_OO-1DcV1ImOXZKFXkGPlZFllA',
  authDomain: 'qwitter-8010b.firebaseapp.com',
  projectId: 'qwitter-8010b',
  storageBucket: 'qwitter-8010b.appspot.com',
  messagingSenderId: '253865553904',
  appId: '1:253865553904:web:2a2778e2b65e289a323735'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// access firebase database with db variable
const db = firebase.firestore()

export default db
