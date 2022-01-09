import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

/* process.env hace referencia a las variables que estan en los archivos .env.development o .env.test, dependiendo del ambiente en el entorno
   en el que estoy se cargaran dinamicamentos los respectivos valores.
   .env.development o .env.test estos archivos se llaman asi porque así los define ->https://create-react-app.dev/docs/adding-custom-environment-variables
   y los nombres de las variables deben comenzar con REACT_APP_ para que react los pueda tomar segun el ambiente
*/
// console.log(process.env);

const firebaseConfig = {
    apiKey : process.env.REACT_APP_APIKEY,
    authDomain : process.env.REACT_APP_AUTHDOMAIN,
    databaseURL : process.env.REACT_APP_DATABASEURL,
    projectId : process.env.REACT_APP_PROJECTID,
    storageBucket : process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId : process.env.REACT_APP_MESSAGINGSENDERID,
    appId : process.env.REACT_APP_APPID
};

/* 
const firebaseConfigTesting = {
    apiKey: "AIzaSyAQWX_Q6ziKbIQLgGVgMLPOX3J6k9I-X4c",
    authDomain: "udemy-test-unitarios.firebaseapp.com",
    projectId: "udemy-test-unitarios",
    storageBucket: "udemy-test-unitarios.appspot.com",
    messagingSenderId: "984638041512",
    appId: "1:984638041512:web:6d32f2a51467ecbcd0c19d",
    measurementId: "G-KL5C5HPMD7"
  }; */

/* if(process.env.NODE_ENV === "test") {
    // base de datos a usar para los test unitarios
    firebase.initializeApp(firebaseConfigTesting);

} else {
    //base dedatos a usar en ambiente development
    firebase.initializeApp(firebaseConfig);
    
} */
firebase.initializeApp(firebaseConfig);
  

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}