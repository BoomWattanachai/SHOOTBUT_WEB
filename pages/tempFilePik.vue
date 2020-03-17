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
      <v-expansion-panels>
        <v-expansion-panel v-for="(message, i) in filteredMessage2" :key="i">
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="36px"> </v-avatar>
              </v-col>
              <v-col class="hidden-xs-only" sm="5" md="3">
                <h3 v-html="message.order[0].orderId"></h3>
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
          <v-expansion-panel-content
            v-for="(orderDetail, index) in message.order[0].orderDetail"
            :key="index"
          >
            <v-divider></v-divider>
            <v-card-text v-text="lorem"></v-card-text>

            <h3 v-if="orderDetail.product.productDetail">
              {{ orderDetail.product.productDetail.image }}
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
      messages: '',
      dataList: '',
      lorem: 'aaaaaaa',
      searchByOrderNumber: '',
      searchByUserEmail: '',
      order: [],
      isLoaded: false
    }
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

      const newArrayData = []
      result.forEach((userData) => {
        userData.order.forEach((element) => {
          newArrayData.push({
            ...userData,
            order: [element]
          })
          // newArrayData.push({ id: 'dd' })
        })
      })
      // console.log(newArrayData)

      // console.log(result)

      // result = [].concat(
      //   ...result.map(({ order }) => order.map((order) => order))
      // )

      // console.log(result)
      return newArrayData
    }
  },

  async created() {
    let userDataList = null
    // console.log('call')
    await apiService
      .getUserListPik()
      .then((data) => {
        userDataList = data
        userDataList.forEach((userData: any) => {
          userData.order.forEach((order: any) => {
            order.orderDetail.forEach((orderDetail: any) => {
              const product = orderDetail.product
              // console.log('orderDetail')
              if (product.categoryId === 1) {
                return apiService.selectProductFoodData(product.productId)
                // .then((response) => {
                //   console.log('startFood')
                //   const data = response[0]
                //   orderDetail.product.productDetail = {
                //     image: data.foodAndBevImage,
                //     brand: data.foodAndBevBrand,
                //     model: data.foodAndBevModel,
                //     price: data.foodAndBevPrice
                //   }
                // })
                // .then(() => console.log('food'))
              }
              // else if (product.categoryId === 2) {
              //   return apiService
              //     .selectProductElectronic(product.productId)
              //     .then((response) => {
              //       const data = response[0]
              //       orderDetail.product.productDetail = {
              //         image: data.electronicImage,
              //         brand: data.electronicBrand,
              //         model: data.electronicModel,
              //         price: data.electronicPrice
              //       }
              //     })
              //     .then(() => console.log('elec'))
              // } else if (product.categoryId === 3) {
              //   return apiService
              //     .selectProductFurniture(product.productId)
              //     .then((response) => {
              //       const data = response[0]
              //       orderDetail.product.productDetail = {
              //         image: data.furnitureImage,
              //         brand: data.furnitureBrand,
              //         model: data.furnitureModel,
              //         price: data.furniturePrice
              //       }
              //     })
              //     .then(() => console.log('furniture'))
              // }
            })
          })
        })
        // console.log('almost end')
        // console.log(userDataList)
        // userData[0].order[0].orderDetail[0].product.productDetail = this.testObject
        // console.log(userData[0].order[0].orderDetail[0].product)
      })
      .then((response) => {
        // console.log(response)
        // this.dataList = userDataList
        // this.messages = userDataList
        // this.isLoaded = true
        // console.log('end')
      })
  },

  methods: {}
})
</script>
