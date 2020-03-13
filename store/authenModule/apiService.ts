import {BaseUrl} from '../apiConfig'
import { SubmitDTO, UserListData } from './authenDTO'

export async function getUserList():Promise<UserListData[] | undefined>

{
    try{
        const res = await BaseUrl.get('/user-data/getUserList')
        return res.data as UserListData[]
    }catch(e){
        console.error(e)
    }
}

export async function getPost(){
    try{
        const res = await BaseUrl.get('/product-data/selectProductList')
        return res.data
    }catch(e){
        console.error(e)
    }
}

export async function selectProductFoodData(productId:string){
    try{
        const res = await BaseUrl.get('/product-data/selectProductFoodData/'+productId)
        return res.data
    }catch(e){
        console.error(e)
    }
}

export async function selectProductFurniture(productId:string){
    try{
        const res = await BaseUrl.get('/user-data/selectProductFurniture/'+productId)
        return res.data
    }catch(e){
        console.error(e)
    }
}

export async function selectProductElectronic(productId:string){
    try{
        const res = await BaseUrl.get('/user-data/selectProductElectronic/'+productId)
        return res.data
    }catch(e){
        console.error(e)
    }
}

export async function submit(param:SubmitDTO){
    try{
        const res = await BaseUrl.post('/product-order/checkoutProductOrder',param)
        return res.data
    }catch(e){
        console.error(e)
    }
}