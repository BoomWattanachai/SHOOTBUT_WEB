import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyCfM-A4v4i_q2dTnAWGdFJzdpaZE74yCh8',
  authDomain: 'automl-bpdesign.firebaseapp.com',
  databaseURL: 'https://automl-bpdesign.firebaseio.com',
  projectId: 'automl-bpdesign',
  storageBucket: 'automl-bpdesign.appspot.com',
  messagingSenderId: '731239503387',
  appId: '1:731239503387:web:0223277efcf874f1d30abe',
  measurementId: 'G-RS2J11T50C'
}
let app = null
// prevent initializing firebase more than once
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}
// inject it so it can be accessed as this.$firebase inside the project
export default (ctx, inject) => {
  inject('firebase', app)
}
