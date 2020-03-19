<template>
  <v-container>
    <div id="login" class="main-box">
      <!-- <h1>Login</h1> -->
      <div class="title">
        <h3>Email</h3>
        <input v-model="email" type="text" class="input" placeholder="Email" />
      </div>
      <div class="title">
        <h3>Password</h3>
        <input
          v-model="password"
          type="password"
          class="input"
          placeholder="Password"
        />
      </div>
      <div class="text-center">
        <div class="my-2">
          <v-btn x-large color="black" dark @click="signInAdmin()">Login</v-btn>
        </div>
      </div>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <v-btn color="blue" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>
<script>
import firebase from 'firebase'
export default {
  data: () => ({
    email: '',
    password: '',
    snackbar: false,
    text: 'Only admin allowed!.',
    timeout: 2000
  }),
  methods: {
    signInAdmin() {
      console.log('Login')
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/testtest')
          // console.log('Email: ' + result.user.email)
          // console.log('UID: ' + result.user.uid)
        })
        .catch((e) => {
          // this.$snotify.error(e.message)
          this.snackbar = true
          this.email = ''
          this.password = ''
          console.log(e.message)
        })
    }
  }
}
</script>
