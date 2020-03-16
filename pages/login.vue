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
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.$router.push('/testtest')
          console.log(result)
        })
      // const user = result.user
    }
  }
}
</script>
