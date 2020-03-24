<template>
  <v-app style="background-color : #194375">
    <v-layout
      ><v-flex d-flex justify-center align-self-center>
        <v-card class="d-inline-block mx-auto">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="12" md="6">
                <v-img
                  height="500"
                  width="500"
                  src="https://men.mthai.com/app/uploads/2018/10/201704091101059430.jpg"
                ></v-img>
              </v-col>

              <v-col cols="12" md="6" class="text-center pl-0">
                <v-row
                  class="flex-column ma-0 fill-height px-4"
                  justify="center"
                >
                  <h1 class="text-center mb-4">Sign in</h1>
                  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                    <v-text-field
                      v-model="email"
                      append-icon="mdi-email"
                      :rules="emailRules"
                      label="E-mail"
                      type="email"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      append-icon="mdi-lock-question"
                      label="Password"
                      type="password"
                      required
                    ></v-text-field>

                    <v-btn
                      color="blue white--text"
                      class="mr-4"
                      width="200"
                      @click="signInAdmin()"
                    >
                      Login
                    </v-btn>
                  </v-form>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-flex></v-layout
    >
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
import firebase from 'firebase'
export default {
  data: () => ({
    email: '',
    password: '',
    snackbar: false,
    text: 'Email and Password mismatch',
    timeout: 2000,
    userData: {
      displayName: String
    }
  }),
  async mounted() {},
  methods: {
    signInAdmin() {
      // console.log('Login')
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/orderList')
          // console.log('Email: ' + result.user.email)
          // console.log('UID: ' + result.user.uid)
        })
        .catch((e) => {
          // this.$snotify.error(e.message)
          this.snackbar = true
          this.email = ''
          this.password = ''
          // console.log(e.message)
        })
    }
  }
}
</script>
