import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCnyv8akVgQIUe3XhMNBtn3hWlB08jZDoU",
  authDomain: "netflix-clone-38569.firebaseapp.com",
  projectId: "netflix-clone-38569",
  storageBucket: "netflix-clone-38569.appspot.com",
  messagingSenderId: "38528642457",
  appId: "1:38528642457:web:a4f9af0531dc9ba53db708"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;