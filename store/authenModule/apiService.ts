import { BaseUrl } from '../apiConfig'
import { SubmitDTO, UserListData, OrderList } from './authenDTO'

export async function getOrderList(): Promise<OrderList[] | undefined> {
  try {
    const res = await BaseUrl.get('/user-data/getUserList')
    const res2 = res.data as UserListData[]
    const orderList = [] as OrderList[]
    // const data = {
    //   email: '',
    //   orderId: 0,
    //   orderDateTime: '',
    //   orderStatus: 0
    // }

    res2.forEach(function(order) {
    //   console.log('order')
    //   console.log(order)
      order.order.forEach(function(orderData) {
        const data = {} as OrderList
        // console.log('orderData')
        // console.log(orderData)
        data.email = order.email
        data.orderId = orderData.orderId
        data.orderDateTime = orderData.orderDateTime
        data.orderStatus = orderData.orderStatus
        // console.log('data')
        // console.log(data)
        orderList.push(data)
      })
    })
    // console.log('orderList as OrderList[]')
    // console.log(orderList as OrderList[])

    return orderList as OrderList[]
  } catch (e) {
    console.error(e)
  }
}

export async function getUserList() {
  try {
    const res = await BaseUrl.get('/user-data/getUserList')
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function getPost() {
  try {
    const res = await BaseUrl.get('/product-data/selectProductList')
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function selectProductFoodData(productId: string) {
  try {
    const res = await BaseUrl.get(
      '/product-data/selectProductFoodData/' + productId
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function selectProductFurniture(productId: string) {
  try {
    const res = await BaseUrl.get(
      '/user-data/selectProductFurniture/' + productId
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function selectProductElectronic(productId: string) {
  try {
    const res = await BaseUrl.get(
      '/user-data/selectProductElectronic/' + productId
    )
    return res.data
  } catch (e) {
    console.error(e)
  }
}

export async function submit(param: SubmitDTO) {
  try {
    const res = await BaseUrl.post('/product-order/checkoutProductOrder', param)
    return res.data
  } catch (e) {
    console.error(e)
  }
}
