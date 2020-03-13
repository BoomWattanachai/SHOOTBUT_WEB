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
      <!-- <v-expansion-panels v-for="(message, i) in filteredMessage" :key="i"> -->
      <v-expansion-panels v-for="(message, i) in filteredMessage2" :key="i">
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
            <h3
              v-if(this.messages)
              v-for="(orderDetail, index) in order.orderDetail"
              :key="index"
            >
              {{ orderDetail.product.productDetail }}
            </h3>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import * as apiService from '@/store/authenModule/apiService'

export default Vue.extend({
  data() {
    return {
      //   itemsPerPageArray: [4, 8, 12],
      messages: [],
      dataList: [],
      lorem: 'aaaaaaa',
      searchByOrderNumber: '',
      searchByUserEmail: '',
      order: [],
      isLoaded: false
    }
  },
  async created() {
    await apiService.getUserList().then((data) => {
      const userDataList = data
      userDataList.forEach((userData: any) => {
        userData.order.forEach((order: any) => {
          order.orderDetail.forEach(async (orderDetail: any) => {
            const product = orderDetail.product
            if (product.categoryId === 1) {
              await apiService
                .selectProductFoodData(product.productId)
                .then((response) => {
                  const data = response[0]
                  orderDetail.product.productDetail = {
                    image: data.foodAndBevImage,
                    brand: data.foodAndBevBrand,
                    model: data.foodAndBevModel,
                    price: data.foodAndBevPrice
                  }
                })
            } else if (product.categoryId === 2) {
              await apiService
                .selectProductFoodData(product.productId)
                .then((response) => {
                  const data = response[0]
                  orderDetail.product.productDetail = {
                    image: data.electronicImage,
                    brand: data.electronicBrand,
                    model: data.electronicModel,
                    price: data.electronicPrice
                  }
                })
            } else if (product.categoryId === 3) {
              await apiService
                .selectProductFoodData(product.productId)
                .then((response) => {
                  const data = response[0]
                  orderDetail.product.productDetail = {
                    image: data.furnitureImage,
                    brand: data.furnitureBrand,
                    model: data.furnitureModel,
                    price: data.furniturePrice
                  }
                })
            }
          })
        })
      })
      this.dataList = userDataList
      this.messages = userDataList
      console.log(userDataList)
      this.isLoaded = true
      // userData[0].order[0].orderDetail[0].product.productDetail = this.testObject
      // console.log(userData[0].order[0].orderDetail[0].product)
    })
  },
  computed: {
    filteredMessage2() {
      if (!this.isLoaded) return null
      // const result = this.messages.filter((message) => {
      //   return message.order.find((order) => {
      //     // return order
      //     // console.log('orderId' + order)
      //     let a: null
      //     if (
      //       (a = order.orderId
      //         .toString()
      //         .match(this.searchByOrderNumber.toString())) &&
      //       (a = message.email
      //         .toLowerCase()
      //         .match(this.searchByUserEmail.toLowerCase()))
      //     )
      //       return a
      //   })
      // })
      // return result
      let listMessage = null
      listMessage = this.dataList
      const result = listMessage.filter((message) => {
        message.order = message.order.filter((order) => {
          // return order.orderId
          //   .toString()
          //   .match(this.searchByOrderNumber.toString())
          // console.log(order)
          // return order.find((orderId) => {
          let a: null
          if (
            (a = order.orderId
              .toString()
              .match(this.searchByOrderNumber.toString())) &&
            (a = message.email
              .toLowerCase()
              .match(this.searchByUserEmail.toLowerCase()))
          )
            return a
          // })
        })
        return message.order
      })
      console.log('Done')
      return result
    }
  },

  methods: {}
})
</script>
