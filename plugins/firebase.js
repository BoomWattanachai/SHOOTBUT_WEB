import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyDDq5QXQoqw6VVkScYws7eUdDKOaQ_tPmY',
  authDomain: 'shootbuy.firebaseapp.com',
  databaseURL: 'https://shootbuy.firebaseio.com',
  projectId: 'shootbuy',
  storageBucket: 'shootbuy.appspot.com',
  messagingSenderId: '1097809184675',
  appId: '1:1097809184675:web:da90090e2a388cfc29bc16',
  measurementId: 'G-TBKHW0D83M'
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
