<template>
  <v-card class="pa-5" color="white">
    <div>
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

        <v-row justify="center" class="px-6">
          <!-- <v-expansion-panels v-for="(message, i) in filteredMessage" :key="i"> -->
          <v-expansion-panels v-for="(message, i) in filteredMessage2" :key="i">
            <v-expansion-panel v-for="(order, j) in message.order" :key="j">
              <v-expansion-panel-header>
                <v-row no-gutters>
                  <v-col cols="12" sm="3" md="1">
                    <v-avatar size="36px"> </v-avatar>
                  </v-col>

                  <v-col cols="12" sm="3" class="ml-12">
                    <v-chip
                      class="ma-2"
                      color="#8facf7"
                      label
                      text-color="white"
                    >
                      <v-icon left>mdi-label</v-icon>
                      Order {{ order.orderId }}
                    </v-chip>
                  </v-col>

                  <v-col cols="12" sm="4" class="mr-6 ml-n10">
                    <v-card-text>{{ message.email }}</v-card-text>
                  </v-col>

                  <v-col v-if="order.orderStatus === 1" cols="12" sm="2">
                    <v-chip class="ma-2" color="red" text-color="white">
                      <v-avatar left>
                        <v-icon>mdi-clock</v-icon>
                      </v-avatar>
                      Pending
                    </v-chip>
                  </v-col>

                  <v-col v-if="order.orderStatus === 2" cols="12" sm="2">
                    <v-chip class="ma-2" color="orange" text-color="white">
                      <v-avatar left>
                        <v-icon>mdi-truck-delivery-outline</v-icon>
                      </v-avatar>
                      Shipping
                    </v-chip>
                  </v-col>

                  <v-col v-if="order.orderStatus === 3" cols="12" sm="2">
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

              <div
                v-for="(orderDetail, index) in order.orderDetail"
                :key="index"
              >
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
                        @click="getSeller(message.uuid, order.orderId, i, j)"
                        >Assign Order</v-btn
                      >
                    </div>
                  </v-col>
                  <v-col
                    v-if="order.orderStatus === 2 || order.orderStatus === 3"
                    cols="12"
                    sm="1"
                  >
                    <div class="my-1 mt-n1">
                      <v-btn small disabled>Assign Order</v-btn>
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
        <template>
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="headline">Assign Order</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12">
                        <v-select
                          v-model="seller"
                          :items="sellerListItem"
                          label="Email's Sender"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                  <!-- <small>*indicates required field</small> -->
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false"
                    >Close</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="confirmProductOrder(), (dialog = false)"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
      </v-container>
    </div>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'

// import moment from 'moment'
// import firebase from 'firebase'
import firebase from 'firebase'
import axios from 'axios'
import * as apiService from '@/store/authenModule/apiService'

Vue.use(require('vue-moment'))
export default Vue.extend({
  data() {
    return {
      //   itemsPerPageArray: [4, 8, 12],
      activeColor: '#194375',
      seller: '',
      orderId: 0,
      dialog: false,
      messages: [],
      timeout: 1200,
      success: false,
      dataList: [],
      allData: [],
      lorem: 'aaaaaaa',
      searchByOrderNumber: '',
      searchByUserEmail: '',
      order: [],
      isLoaded: false,
      userData: {
        displayName: '',
        uid: ''
      },
      sellerListItem: [],
      sellerListUuid: [],
      sellerOrder: {
        sellerUuid: String,
        orderId: Number,
        assignBy: String
      },
      tempInex: {
        indexI: Number,
        indexJ: Number
      }
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
    let userDataList: any

    await firebase.auth().onAuthStateChanged((user) => {
      this.userData = user
      if (this.userData === null) this.$router.push('/')
      // console.log('this.userData')
      // console.log(this.userData)
    })
    // const retrievedObject = localStorage.getItem('user')
    // console.log('retrievedObject')
    // console.log(localStorage.getItem('user'))

    await apiService
      .getUserList()
      .then((data) => {
        console.log('FFFF')
        console.log(data)
        userDataList = data
        const promises = []
        userDataList.forEach((userData: any) => {
          userData.order.forEach((order: any) => {
            promises.push(
              apiService
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
            )

            order.orderDetail.forEach((orderDetail: any) => {
              const product = orderDetail.product
              if (product.categoryId === 1) {
                promises.push(
                  apiService
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
                )
              } else if (product.categoryId === 2) {
                promises.push(
                  apiService
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
                )
              } else if (product.categoryId === 3) {
                promises.push(
                  apiService
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
                )
              } else if (product.categoryId === 4) {
                promises.push(
                  apiService
                    .selectProductTileData(product.productId)
                    .then((response) => {
                      const data = response[0]
                      orderDetail.product.productDetail = {
                        image: data.tileImage,
                        brand: data.tileBrand,
                        model: data.tileModel,
                        price: data.tilePrice
                      }
                    })
                )
              }
            })
          })
        })
        return axios.all(promises)
      })
      .then(() => {
        console.log('SSSSS')
        console.log(userDataList)
        this.dataList = userDataList
        this.messages = userDataList
        this.isLoaded = true
      })
  },
  async mounted() {
    // console.log(await firebase.auth().currentUser)
  },

  methods: {
    test() {
      if (this.seller !== '') {
        // console.log('aasdasdasfdasfasd')
        // console.log(this.seller)
      }
    },
    async getSeller(ownerOrder: String, orderId: Number, i: Number, j: Number) {
      this.sellerListItem = []
      this.sellerListUuid = []
      this.orderId = orderId
      this.tempInex.indexI = i
      this.tempInex.indexJ = j
      // console.log('testFunction')
      // console.log(orderId)
      // console.log(this.orderId)
      await apiService.getSellerList(ownerOrder).then((response) => {
        response.forEach((seler: any) => {
          this.sellerListItem.push(seler.sellerEmail)
          this.sellerListUuid.push(seler.sellerUuid)
        })

        // console.log(this.sellerListItem)
        this.dialog = true
      })
    },
    async confirmProductOrder() {
      if (this.seller !== '') {
        let tempSellerUuid = ''

        this.sellerListItem.forEach((seller, index) => {
          if (seller === this.seller) {
            tempSellerUuid = this.sellerListUuid[index]
          }
        })

        const arrayData = this.dataList
        this.sellerOrder.sellerUuid = tempSellerUuid
        this.sellerOrder.orderId = this.orderId
        this.sellerOrder.assignBy = this.userData.uid

        // console.log('this.sellerOrder')
        // console.log(this.sellerOrder)
        await apiService
          .assignSellerOrder(this.sellerOrder)
          .then(() => {
            arrayData[this.tempInex.indexI].order[
              this.tempInex.indexJ
            ].orderStatus = 2
            this.success = true
          })
          .then(() => {
            this.dataList = arrayData
          })
          .then(() => {
            this.filteredMessage2()
          })
      }
    }
  }
})
</script>
