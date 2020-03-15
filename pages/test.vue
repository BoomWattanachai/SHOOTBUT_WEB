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
            <v-row no-gutters>
              <v-col cols="12" sm="3" md="1">
                <v-avatar size="36px"> </v-avatar>
              </v-col>

              <v-col cols="12" sm="3" class="ml-12">
                <v-card-text>{{ order.orderId }}</v-card-text>
              </v-col>

              <v-col cols="12" sm="4" class="mr-6 ml-n10">
                <v-card-text>{{ message.email }}</v-card-text>
              </v-col>

              <!-- <v-col class="hidden-xs-only" sm="12" md="3">
                <h3 v-html="order.orderId"></h3>
              </v-col>

              <v-col class="text-no-wrap" cols="12" sm="3">
                <h3 v-html="message.email"></h3>
              </v-col> -->

              <v-col cols="12" sm="2" v-if="order.orderStatus === 1">
                <v-card-text class="red--text text-no-wrap"
                  >In Progress</v-card-text
                >
              </v-col>

              <v-col cols="12" sm="2" v-if="order.orderStatus === 2">
                <v-card-text class="green--text text-no-wrap"
                  >Success</v-card-text
                >
              </v-col>

              <v-col cols="12" sm="1">
                <v-card-text> </v-card-text>
              </v-col>

              <!-- <v-col
                class="red--text text-no-wrap"
                cols="12"
                sm="5"
                v-if="order.orderStatus === 1"
              >
              
                <h3>In Progress</h3>
              </v-col>

              <v-col
                class="green--text text-no-wrap"
                cols="12"
                sm="5"
                v-if="order.orderStatus === 2"
              >
                <h3>Success</h3>
              </v-col> -->

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

          <div v-for="(orderDetail, index) in order.orderDetail" :key="index">
            <div v-if="orderDetail.product.productDetail">
              <v-expansion-panel-content>
                <v-divider></v-divider>

                <v-row>
                  <v-col cols="12" sm="1">
                    <v-card-text> </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-card-text>
                      <v-img
                        v-bind:src="orderDetail.product.productDetail.image"
                        aspect-ratio="1.4"
                        contain
                        max-width="100"
                        max-height="100"
                      ></v-img>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-card-text>{{
                      orderDetail.product.productDetail.brand
                    }}</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-card-text>{{
                      orderDetail.product.productDetail.model
                    }}</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="1">
                    <v-card-text>{{
                      orderDetail.product.productDetail.price
                    }}</v-card-text>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </div>
          </div>
          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-row class="mt-3 mb-n4">
              <v-col cols="12" sm="11">
                <p class="font-weight-black text-right">
                  Total: {{ order.totalPrice }}
                </p>
              </v-col>
              <v-col cols="12" sm="1" v-if="order.orderStatus === 1">
                <div class="my-2 mt-n1">
                  <v-btn small color="success" dark>Confirm Order</v-btn>
                </div>
              </v-col>
              <v-col cols="12" sm="1" v-if="order.orderStatus === 2">
                <div class="my-1 mt-n1">
                  <v-btn small disabled>Confirm Order</v-btn>
                </div>
              </v-col>
            </v-row>
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

      // console.log(this.allData)
      // if (this.allData.length === 0) {
      //   console.log('aaasdasdsafsafasdfa')
      //   this.allData = userDataList
      // }

      this.dataList = userDataList
      this.messages = userDataList
      // console.log(userDataList)
      console.log('this.dataList1')
      console.log(this.dataList)
      this.isLoaded = true
      // userData[0].order[0].orderDetail[0].product.productDetail = this.testObject
      // console.log(userData[0].order[0].orderDetail[0].product)
    })
  },
  computed: {
    filteredMessage2() {
      if (!this.isLoaded) return null
      let listMessage = null
      listMessage = this.dataList
      const result = listMessage
        .filter((message) => {
          return message.order.some((order) => {
            return (
              order.orderId
                .toString()
                .match(this.searchByOrderNumber.toString()) &&
              message.email
                .toLowerCase()
                .match(this.searchByUserEmail.toLowerCase())
            )
          })
        })
        .map((message) => {
          const mappedData = Object.assign({}, message, {
            order: message.order.filter((order) => {
              return (
                order.orderId
                  .toString()
                  .match(this.searchByOrderNumber.toString()) &&
                message.email
                  .toLowerCase()
                  .match(this.searchByUserEmail.toLowerCase())
              )
            })
          })
          return mappedData
        })
      console.log(result)
      return result
    }
  },

  methods: {}
})
</script>
