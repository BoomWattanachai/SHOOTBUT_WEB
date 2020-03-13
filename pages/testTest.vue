<template>
  <v-container>
    <template>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="searchByOrderNumber"
                label="Search by Order Number"
                outlined
                shaped
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="searchByUserEmail"
                label="Search by User Email"
                outlined
                shaped
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>

    <v-row justify="center">
      <v-expansion-panels v-for="(message, i) in filteredMessage" :key="i">
        <v-expansion-panel v-for="(order, j) in message.order" :key="j">
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="36px"> </v-avatar>
              </v-col>

              <v-col class="hidden-xs-only" sm="5" md="3">
                <h3 v-html="order.orderId"></h3>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="2">
                <h3 v-html="message.email"></h3>
              </v-col>

              <!-- <v-col class="text-no-wrap" cols="5" sm="2">
                <h3 v-html="messages[j].order.orderDateTime"></h3>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="2">
                <h3 v-html="messages[j].order.orderStatus"></h3>
              </v-col> -->
              <!--                   
                  <v-col class="text-no-wrap" cols="5" sm="3">
                    <strong v-html="message.testA"></strong>
                  </v-col>

                  <v-col class="text-no-wrap" cols="5" sm="3">
                    <strong v-html="message.testB"></strong>
                  </v-col> -->
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-card-text v-text="lorem"></v-card-text>
            <h3>abc</h3>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import * as aaa from '@/store/authenModule/apiService'

type OrderList = {
  email: string
  orderId: number
  orderDateTime: Date
  orderStatus: number
}

export default Vue.extend({
  props: {
    orderList: {
      type: Object as () => OrderList
    }
  },
  data() {
    return {
      //   itemsPerPageArray: [4, 8, 12],
      messages: [],
      lorem: 'aaaaaaa',
      searchByOrderNumber: '',
      searchByUserEmail: ''
    }
  },
  computed: {
    filteredMessage() {
      return this.messages.filter((message) => {
        return message.email
          .toLowerCase()
          .match(this.searchByUserEmail.toLowerCase())
      })
    }
    // ,
    // filteredMessage2() {
    //   return this.messages.filter((message) => {

    //   })
    // }
  },
  async created() {
    await aaa.getUserList().then((res: any) => {
      this.messages = res

      this.messages.forEach((message: any) => {
        message.order.forEach((order: any) => {
          this.orderList.email = message.email
          this.orderList.orderId = order.orderId
          this.orderList.orderDateTime = order.orderDateTime
          this.orderList.orderStatus = order.orderStatus
        })
      })
      console.log('Boommmmmmmmmmmm')
      console.log(orderList)
    })
  },
  methods: {}
})
</script>
