// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get, child } = require("firebase/database");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrKGp4QOjMzlLgBS5iOPnntC_FSwvIJMc",
    authDomain: "dsw-02-rest.firebaseapp.com",
    projectId: "dsw-02-rest",
    storageBucket: "dsw-02-rest.appspot.com",
    messagingSenderId: "257674011968",
    appId: "1:257674011968:web:3423213070bd0f6a85c6a5",
    measurementId: "G-PM4F59X654"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = { db };