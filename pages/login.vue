<template>
  <div class="container">
    <button @click="signInPopup">Sign In</button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  methods: {
    async signInPopup() {
      const provider = new firebase.auth.GoogleAuthProvider()
      const result = await firebase.auth().signInWithPopup(provider)
      const user = result.user
      console.log(user)
    }
  }
}
</script>
