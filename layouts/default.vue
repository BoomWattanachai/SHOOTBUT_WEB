<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <template>
        <div v-if="userData" class="text-right">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :open-on-hover="true"
            :nudge-width="100"
            offset-x
          >
            <template v-slot:activator="{ on }">
              <v-list-item-avatar v-on="on">
                <img :src="userData.photoURL" />
              </v-list-item-avatar>
            </template>

            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img :src="userData.photoURL" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      userData.displayName
                    }}</v-list-item-title>
                    <v-list-item-subtitle>
                      Admin
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>

              <!-- <v-list>
                <v-list-item>
                  <v-col
                    class="text-right"
                    cols="12"
                    sm="12"
                    style="cursor: pointer;"
                    @click="signOutBtn()"
                  >
                    <div class="my-2">
                      <v-btn text color="primary">Logout</v-btn>
                    </div>
                  </v-col>
                </v-list-item>
              </v-list> -->

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" text @click="signOutBtn()">Logout</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </template>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'
export default Vue.extend({
  data() {
    return {
      title: 'Shoot buy',
      fav: true,
      menu: false,
      message: false,
      hints: true,
      userData: {
        displayName: String
      }
    }
  },
  async mounted() {
    await firebase.auth().onAuthStateChanged((user) => {
      this.userData = user
      console.log('this.userData')
      console.log(this.userData)
    })
  },
  methods: {
    async signOutBtn() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/')
        })
    }
  }
})
</script>
