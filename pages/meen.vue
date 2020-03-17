<template>
  <v-container>
    <v-row justify="center">
      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(message, i) in messages"
          :key="i"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="36px"> </v-avatar>
              </v-col>

              <v-col class="hidden-xs-only" sm="5" md="3">
                <strong v-html="message.productId"></strong>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="3">
                <strong v-html="message.categoryId"></strong>
              </v-col>

              <v-col
                v-if="message.foodAndBevPrice"
                class="grey--text text-truncate hidden-sm-and-down"
              >
                &mdash;
                {{ message.foodAndBevPrice }}
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-card-text v-text="lorem"></v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import * as aa from '@/store/authenModule/apiService'
export default Vue.extend({
  data() {
    return {
      title: 'Shoot buy',
      orderId: 0,
      addressId: 0,
      messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          productId: 'John Leider',
          categoryId: 'Welcome to Vuetify.js!',
          foodAndBevPrice: 'Thank you for joining our community...'
        }
      ],
      lorem:
        'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.'
    }
  },
  async created() {
    await aa.getUserList().then((res: any) => {
      this.messages = res
      // console.log(res)
    })
  },
  methods: {
    async send() {
      await aa
        .submit({
          orderId: this.orderId,
          addressId: this.addressId
        })
        .then((res: any) => {
          // console.log(res)
        })
    },
    test() {
      this.title = 'MEEN'
    }
  }
})
</script>
