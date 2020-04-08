import axios from 'axios'
export const BaseUrl = axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: 'http://100.66.112.51:3000'
})