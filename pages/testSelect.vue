<template>
  <v-container>
    <h1>SALMON</h1>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import * as apiService from '@/store/authenModule/apiService'
export default Vue.extend({
  data(): any {
    return {
      testObject: {
        name: 'dd',
        price: 50
      }
    }
  },
  async mounted() {
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
      console.log(userDataList)
      // userData[0].order[0].orderDetail[0].product.productDetail = this.testObject
      // console.log(userData[0].order[0].orderDetail[0].product)
    })
  }
})
</script>
