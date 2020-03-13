import axios from 'axios'
export const BaseUrl = axios.create({
    baseURL: 'http://100.66.112.67:3000'
})