import axios from 'axios'
import users, { IApiUsers } from 'api/users'

export const axiosWrapper = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

axiosWrapper.interceptors.response.use((response: any) => response)

axiosWrapper.interceptors.request.use(
    (config: any) =>
        // TODO: implement token authentication
        config
)

export interface IApiServices {
    users: IApiUsers
}

export default {
    users
}
