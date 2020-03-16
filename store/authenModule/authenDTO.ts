export interface SubmitDTO {
  orderId: number
  addressId: number
}

export interface UserListData {
  uuid: string
  email: string
  firstName: string
  lastName: string
  order: Order[]
}

export interface Order {
  orderId: number
  uuid: string
  addressId: number
  orderDateTime: Date
  totalPrice: number
  orderStatus: number
  orderDetail: OrderDetail[]
}

export interface OrderId {
  orderId: number
}

export interface OrderDetail {
  orderId: number
  productId: string
  quantity: number
  product: Product
}

export interface Product {
  productId: string
  categoryId: number
}

export interface OrderList {
  email: string
  orderId: number
  orderDateTime: Date
  orderStatus: number
}

export interface User {
  uuid: string
  email: string
  firstName: string
  lastName: string
  role: number
}
