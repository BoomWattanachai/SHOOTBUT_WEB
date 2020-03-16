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
                <v-chip class="ma-2" color="#8facf7" label text-color="white">
                  <v-icon left>mdi-label</v-icon>
                  Order {{ order.orderId }}
                </v-chip>
              </v-col>

              <v-col cols="12" sm="4" class="mr-6 ml-n10">
                <v-card-text>{{ message.email }}</v-card-text>
              </v-col>

              <v-col v-if="order.orderStatus === 1" cols="12" sm="2">
                <v-chip class="ma-2" color="orange" text-color="white">
                  <v-avatar left>
                    <v-icon>mdi-clock</v-icon>
                  </v-avatar>
                  Pending
                </v-chip>
              </v-col>

              <v-col v-if="order.orderStatus === 2" cols="12" sm="2">
                <v-chip class="ma-2" color="teal" text-color="white">
                  <v-avatar left>
                    <v-icon>mdi-checkbox-marked-circle</v-icon>
                  </v-avatar>
                  Success
                </v-chip>
              </v-col>

              <v-col cols="12" sm="1">
                <v-card-text> </v-card-text>
              </v-col>
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
                        :src="orderDetail.product.productDetail.image"
                        aspect-ratio="1.4"
                        contain
                        max-width="100"
                        max-height="100"
                      ></v-img>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="3">
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
                    <v-card-text
                      >{{ orderDetail.product.productDetail.price }} x
                      {{ orderDetail.quantity }}
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="1">
                    <v-card-text
                      >Total:
                      {{
                        orderDetail.product.productDetail.price *
                          orderDetail.quantity
                      }}</v-card-text
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </div>
          </div>
          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-row class="mt-3 mb-n4">
              <v-col cols="12" sm="8">
                <p class="font-weight-black text-left">
                  Shipping Address: {{ message.firstName }}
                  {{ message.lastName }} , {{ order.addressData }} (
                  {{ order.orderDateTime | moment('DD/MM/YYYY') }} )
                </p>
              </v-col>
              <v-col cols="12" sm="3">
                <p class="font-weight-black text-right">
                  Total: {{ order.totalPrice }}
                </p>
              </v-col>
              <v-col v-if="order.orderStatus === 1" cols="12" sm="1">
                <div class="my-2 mt-n1">
                  <v-btn
                    small
                    color="success"
                    dark
                    @click="confirmProductOrder(i, j)"
                    >Confirm Order</v-btn
                  >
                </div>
              </v-col>
              <v-col v-if="order.orderStatus === 2" cols="12" sm="1">
                <div class="my-1 mt-n1">
                  <v-btn small disabled>Confirm Order</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-snackbar v-model="success" :timeout="timeout" color="green"
      >Success
    </v-snackbar>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'

// import moment from 'moment'
// import firebase from 'firebase'
import * as apiService from '@/store/authenModule/apiService'
Vue.use(require('vue-moment'))
export default Vue.extend({
  data() {
    return {
      //   itemsPerPageArray: [4, 8, 12],
      messages: [],
      timeout: 1200,
      success: false,
      dataList: [],
      allData: [],
      lorem: 'aaaaaaa',
      searchByOrderNumber: '',
      searchByUserEmail: '',
      order: [],
      isLoaded: false
    }
  },
  computed: {
    filteredMessage2() {
      // if (!this.isLoaded) return null
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
      // console.log(result)
      return result
    }
  },
  async created() {
    let count = 0
    await apiService.getUserList().then((data) => {
      const userDataList = data
      console.log(userDataList)
      userDataList.forEach((userData: any) => {
        console.log('log1')
        userData.order.forEach(async (order: any) => {
          console.log('log2')
          await apiService
            .getUserAddressByAddressId(order.addressId)
            .then((response) => {
              order.addressData =
                response.addressNumber +
                ' ' +
                response.district +
                ' ' +
                response.subDistrict +
                ' ' +
                response.province +
                ' ' +
                response.zipCode
            })

          order.orderDetail.forEach(async (orderDetail: any) => {
            console.log('log3')
            const product = orderDetail.product
            if (product.categoryId === 1) {
              await apiService
                .selectProductFoodData(product.productId)
                .then((response) => {
                  console.log('log6')
                  const data = response[0]
                  orderDetail.product.productDetail = {
                    image: data.foodAndBevImage,
                    brand: data.foodAndBevBrand,
                    model: data.foodAndBevModel,
                    price: data.foodAndBevPrice
                  }
                })
                .then(() => {
                  // console.log('log4')
                  // console.log('111111111')
                  // console.log(count)
                  count++
                  // console.log('222222222')
                  // console.log(count)
                  // console.log('----------------------------')
                  if (
                    count ===
                    userDataList.length +
                      userData.order.length +
                      order.orderDetail.length
                  ) {
                    console.log(userDataList)
                    this.dataList = userDataList
                    this.messages = userDataList
                    this.isLoaded = true
                  }
                })
            } else if (product.categoryId === 2) {
              await apiService
                .selectProductElectronic(product.productId)
                .then((response) => {
                  const data = response[0]
                  orderDetail.product.productDetail = {
                    image: data.electronicImage,
                    brand: data.electronicBrand,
                    model: data.electronicModel,
                    price: data.electronicPrice
                  }
                })
                .then(() => {
                  // console.log('log4')
                  // console.log('111111111')
                  // console.log(count)
                  count++
                  // console.log('222222222')
                  // console.log(count)
                  // console.log('----------------------------')
                  if (
                    count ===
                    userDataList.length +
                      userData.order.length +
                      order.orderDetail.length
                  ) {
                    this.dataList = userDataList
                    this.messages = userDataList
                    this.isLoaded = true
                  }
                })
            } else if (product.categoryId === 3) {
              await apiService
                .selectProductFurniture(product.productId)
                .then((response) => {
                  const data = response[0]
                  orderDetail.product.productDetail = {
                    image: data.furnitureImage,
                    brand: data.furnitureBrand,
                    model: data.furnitureModel,
                    price: data.furniturePrice
                  }
                })
                .then(() => {
                  // console.log('log4')
                  // console.log('111111111')
                  // console.log(count)
                  count++
                  // console.log('222222222')
                  // console.log(count)
                  // console.log('----------------------------')
                  if (
                    count ===
                    userDataList.length +
                      userData.order.length +
                      order.orderDetail.length
                  ) {
                    this.dataList = userDataList
                    this.messages = userDataList
                    this.isLoaded = true
                  }
                })
            }
          })
        })
      })
      console.log('log5')
      // console.log(this.allData)
      // if (this.allData.length === 0) {
      //   console.log('aaasdasdsafsafasdfa')
      //   this.allData = userDataList
      // }

      // this.dataList = this.allData
      // this.messages = userDataList
      // console.log(userDataList)
      // console.log('this.dataList1')
      // console.log(this.allData[0])
      // this.isLoaded = true
      // userData[0].order[0].orderDetail[0].product.productDetail = this.testObject
      // console.log(userData[0].order[0].orderDetail[0].product)
    })
  },
  async mounted() {
    // console.log(await firebase.auth().currentUser)
  },

  methods: {
    async confirmProductOrder(i: number, j: number) {
      const arrayData = this.dataList
      const orderId = arrayData[i].order[j].orderId
      await apiService
        .confirmProductOrder({
          orderId
        })
        .then(() => {
          arrayData[i].order[j].orderStatus = 2
          this.success = true
        })
        .then(() => {
          this.dataList = arrayData
        })
    },

    async getAddress(i: number, j: number) {
      const arrayData = this.dataList
      const addressId = arrayData[i].order[j].addressId
      await apiService
        .getUserAddressByAddressId(addressId)
        .then((response) => {
          return (
            response.addressNumber +
            ' ' +
            response.district +
            ' ' +
            response.subDistrict +
            ' ' +
            response.province +
            ' ' +
            response.zipCode
          )
        })
        .then((data) => {
          return data
        })
    }
  }
})
</script>
