import axios from 'axios'
export const BaseUrl = axios.create({
    baseURL: 'http://192.168.1.116:3000'
})