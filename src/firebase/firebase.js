import firebase from 'firebase/app'
import 'firebase/storage'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB5GfvK2cdB9qJSVtkt4DFgbiqzImIOA9E",
    authDomain: "desk-sales.firebaseapp.com",
    databaseURL: "https://desk-sales.firebaseio.com",
    projectId: "desk-sales",
    storageBucket: "desk-sales.appspot.com",
    messagingSenderId: "309285819884",
    appId: "1:309285819884:web:aca84341333eceefc79cc9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }