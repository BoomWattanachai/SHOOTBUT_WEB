import {BaseUrl} from '../apiConfig'
import { SubmitDTO } from './authenDTO'

export async function getpost(){
    try{
        const res = await BaseUrl.get('/product-data/selectProductList')
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