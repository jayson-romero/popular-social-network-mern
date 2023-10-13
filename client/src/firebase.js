// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBp6tzFPmF7ukxQUhWx3DEMrvt-e1sfuWw",
	authDomain: "popular-social-mern-3e856.firebaseapp.com",
	projectId: "popular-social-mern-3e856",
	storageBucket: "popular-social-mern-3e856.appspot.com",
	messagingSenderId: "263469431270",
	appId: "1:263469431270:web:74364d461c38c68fdd3e27",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => signInWithPopup(auth, provider)
