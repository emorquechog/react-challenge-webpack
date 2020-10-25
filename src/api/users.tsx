import { AxiosPromise } from 'axios'
import { IUser } from 'store/users/models'
import { axiosWrapper } from './index'

export interface IApiUsers {
    getUsers: () => AxiosPromise<any>
    getUser: (id: number) => AxiosPromise<any>
    updateUser: (user: IUser) => AxiosPromise<any>
    createUser: (user: IUser) => AxiosPromise<any>
    deleteUser: (id: number) => AxiosPromise<any>
}

export default {
    getUsers: () => axiosWrapper.get('/users'),
    getUser: (id: number) => axiosWrapper.get(`/users?id=${id}`),
    updateUser: (user: IUser) =>
        axiosWrapper.put(`/users/${user.id}`, {
            user
        }),
    createUser: (user: IUser) =>
        axiosWrapper.post('/users', {
            user
        }),
    deleteUser: (id: number) => axiosWrapper.delete(`/users/${id}`)
}
