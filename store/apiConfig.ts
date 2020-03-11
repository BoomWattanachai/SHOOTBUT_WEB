import axios from 'axios'
export const BaseUrl = axios.create({
    baseURL: 'http://100.66.112.25:3000'
})