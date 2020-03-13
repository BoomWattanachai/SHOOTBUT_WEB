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
      <v-expansion-panels v-for="(message, i) in filteredMessage" :key="i">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="36px"> </v-avatar>
              </v-col>

              <v-col class="hidden-xs-only" sm="5" md="3">
                <h3>Order Number# {{ message.orderId }}</h3>
              </v-col>

              <v-col class="tex{t-no-wrap" cols="5" sm="2">
                <h3>{{ message.email }}</h3>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="text-no-wrap" cols="5" sm="2">
                <h3>{{ message.orderDateTime }}</h3>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="text-no-wrap" cols="5" sm="2">
                <h3>{{ message.orderStatus }}</h3>
              </v-col>
              <!--                   
                  <v-col class="text-no-wrap" cols="5" sm="3">
                    <strong v-html="message.testA"></strong>
                  </v-col>

                  <v-col class="text-no-wrap" cols="5" sm="3">
                    <strong v-html="message.testB"></strong>
                  </v-col> -->
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content
            v-for="(detail, index) in selectOrderDetail"
            :key="index"
          >
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" sm="3">
                <v-card-text>{{ detail.orderId }}</v-card-text>
              </v-col>
              <v-col cols="12" sm="3">
                <v-card-text>{{ detail.brand }}</v-card-text>
              </v-col>
              <v-col cols="12" sm="3">
                <v-card-text>{{ detail.model }}</v-card-text>
              </v-col>
              <v-col cols="12" sm="3">
                <v-card-text>{{ detail.price }}</v-card-text>
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
      messages: [],
      lorem: 'aaaaaaa',
      searchByOrderNumber: '',
      searchByUserEmail: '',
      orderDatail: [],
      id: [],
      email: '',
      kkk: -1
    }
  },
  computed: {
    filteredMessage() {
      return this.messages.filter((message) => {
        return (
          message.email.toLowerCase().match(this.searchByUserEmail) &&
          message.orderId.toString().match(this.searchByOrderNumber)
        )
      })
    },
    selectOrderDetail() {
      console.log('this.k')
      console.log(this.kkk)
      // this.kkk++
      return this.orderDatail.filter((orderDatailData, index) => {
        return (
          orderDatailData.email.toLowerCase().match(this.searchByUserEmail) &&
          orderDatailData.orderId.toString().match(this.searchByOrderNumber) &&
          orderDatailData.orderId.toString().match(this.id[2])
        )
      })
    }
  },
  async mounted() {
    await apiService.getUserList().then((data) => {
      const userDataList = data
      userDataList.forEach((userData: any) => {
        // console.log('userData')
        // console.log(userData)
        userData.order.forEach((order: any) => {
          // console.log('order')
          // console.log(order.orderId)
          this.id.push(order.orderId)
          order.orderDetail.forEach(async (orderDetail: any) => {
            const product = orderDetail.product
            if (product.categoryId === 1) {
              await apiService
                .selectProductFoodData(product.productId)
                .then((response) => {
                  const data = response[0]
                  orderDetail.product.productDetail = {
                    email: userData.email,
                    orderId: order.orderId,
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
                    email: userData.email,
                    orderId: order.orderId,
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
                    email: userData.email,
                    orderId: order.orderId,
                    image: data.furnitureImage,
                    brand: data.furnitureBrand,
                    model: data.furnitureModel,
                    price: data.furniturePrice
                  }
                })
            }
            this.orderDatail.push(orderDetail.product.productDetail)
          })
        })
      })
      // console.log('orderDatail')
      // console.log(this.orderDatail)
      // userData[0].order[0].orderDetail[0].product.productDetail = this.testObject
      // console.log(userData[0].order[0].orderDetail[0].product)
    })
  },

  async created() {
    await apiService.getOrderList().then((res: any) => {
      this.messages = res

      // console.log(res)
    })
  },
  methods: {}
})
</script>
