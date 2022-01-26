import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASyav3_WaBkYRnJiWa6dB40Nx5TtGbz2U",
  authDomain: "ripio-chllg.firebaseapp.com",
  projectId: "ripio-chllg",
  storageBucket: "ripio-chllg.appspot.com",
  messagingSenderId: "31298924123",
  appId: "1:31298924123:web:e4beaf30eaba8dd5bc197e",
  measurementId: "G-S7KK90Y1MN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const exp = {app, analytics}

export default exp;
