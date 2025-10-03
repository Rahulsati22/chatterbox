import axios from 'axios'
export const axios2 = axios.create({
    baseURL:'http://localhost:3000/api',
    withCredentials : true
})