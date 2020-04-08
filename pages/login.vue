<template>
  <div class="container">
    <div class="text-center">
      <div class="my-2">
        <v-btn x-large color="white" dark @click="signInPopup"
          >Extra large Button</v-btn
        >
      </div>
    </div>
    <!-- <button @click="signInPopup">Sign In</button> -->
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import firebase from 'firebase'
import * as apiService from '@/store/authenModule/apiService'

export default {
  data: () => ({
    snackbar: false,
    text: 'Only admin allowed!.',
    timeout: 2000
  }),
  methods: {
    async signInPopup() {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          const displayName = result.user.displayName
          localStorage.setItem('user', 'aaa')
          localStorage.setItem('lastname', 'Smith')
          // console.log(displayName)
          const convertedName = displayName.split(' ')
          // console.log(convertedName)
          return apiService.ifUserExist({
            uuid: result.user.uid,
            email: result.user.email,
            firstName: convertedName[0],
            lastName: convertedName[1]
          })
        })
        .then((response) => {
          return apiService.checkUserRole(response.uuid)
        })
        .then((response) => {
          const responseData = response[0]
          if (responseData.role === 0) {
            this.$router.push('/testtest')
          } else {
            this.snackbar = true
          }
        })
        .catch((e) => {
          this.$snotify.error(e.message)
          // console.log(e)
        })
      // const user = result.user
    }
  }
}
</script>
