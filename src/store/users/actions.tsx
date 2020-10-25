import { Dispatch } from 'redux'
import { IApiServices } from 'api'
import { IAppState } from '..'
import { IUser } from './models'
import UsersActionType from './constants'

interface IGetUserSuccess {
    type: UsersActionType.GET_USERS_SUCCESS
    data: IUser[]
}

interface IGetUserInitial {
    type: UsersActionType.GET_USERS_INITIAL
}

interface IGetUserError {
    type: UsersActionType.GET_USERS_ERROR
}

interface IGetUser {
    type: UsersActionType.GET_USER
    data: IUser
}

interface IClearUserDetail {
    type: UsersActionType.CLEAR_USER_DETAIL
}

// #region update user
interface IUpdateUserSuccess {
    type: UsersActionType.UPDATE_USER_SUCCESS
    user: IUser
}

interface IUpdateUserInitial {
    type: UsersActionType.UPDATE_USER_INITIAL
}

interface IUpdateUserError {
    type: UsersActionType.UPDATE_USER_ERROR
}
const updateUserSuccess = (user: IUser) => ({
    type: UsersActionType.UPDATE_USER_SUCCESS,
    user
})

const updateUserInitial = () => ({
    type: UsersActionType.UPDATE_USER_INITIAL
})

const updateUserError = () => ({
    type: UsersActionType.UPDATE_USER_ERROR
})
// #endregion

// #region create user
interface ICreateUserSuccess {
    type: UsersActionType.CREATE_USER_SUCCESS
    user: IUser
}

interface ICreateUserInitial {
    type: UsersActionType.CREATE_USER_INITIAL
}

interface ICreateUserError {
    type: UsersActionType.CREATE_USER_ERROR
}
const createUserSuccess = (user: IUser) => ({
    type: UsersActionType.CREATE_USER_SUCCESS,
    user
})

const createUserInitial = () => ({
    type: UsersActionType.CREATE_USER_INITIAL
})

const createUserError = () => ({
    type: UsersActionType.CREATE_USER_ERROR
})
// #endregion

// #region delete user
interface IDeleteUserSuccess {
    type: UsersActionType.DELETE_USER_SUCCESS
    id: number
}

interface IDeleteUserInitial {
    type: UsersActionType.DELETE_USER_INITIAL
}

interface IDeleteUserError {
    type: UsersActionType.DELETE_USER_ERROR
}
const deleteUserSuccess = (id: number) => ({
    type: UsersActionType.DELETE_USER_SUCCESS,
    id
})

const deleteUserInitial = () => ({
    type: UsersActionType.DELETE_USER_INITIAL
})

const deleteUserError = () => ({
    type: UsersActionType.DELETE_USER_ERROR
})
// #endregion

export type Action =
    | IGetUserSuccess
    | IGetUserError
    | IGetUserInitial
    | IGetUser
    | IClearUserDetail
    | IUpdateUserError
    | IUpdateUserInitial
    | IUpdateUserSuccess
    | ICreateUserError
    | ICreateUserInitial
    | ICreateUserSuccess
    | IDeleteUserError
    | IDeleteUserInitial
    | IDeleteUserSuccess

export const getUsersSuccess = (data: IUser[]) => ({
    type: UsersActionType.GET_USERS_SUCCESS,
    data
})

export const getUsersError = () => ({
    type: UsersActionType.GET_USERS_ERROR
})

export const getUsersInitial = () => ({
    type: UsersActionType.GET_USERS_ERROR
})

export const getUser = (data: IUser) => ({
    type: UsersActionType.GET_USER,
    data
})

export const clearUserDetail = () => ({
    type: UsersActionType.CLEAR_USER_DETAIL
})

export const fetchUsers = () => {
    return async (
        dispatch: Dispatch,
        getState: () => IAppState,
        apiService: IApiServices
    ) => {
        dispatch(getUsersInitial())
        try {
            const response = await apiService.users.getUsers()
            dispatch(getUsersSuccess(response.data.data))
        } catch (error) {
            dispatch(getUsersError())
        }
    }
}

export const fetchUser = (id: number) => {
    return async (
        dispatch: Dispatch,
        getState: () => IAppState,
        apiService: IApiServices
    ) => {
        try {
            const response = await apiService.users.getUser(id)
            dispatch(getUser(response.data.data))
        } catch (error) {
            dispatch(getUsersError())
        }
    }
}

export const createUser = (user: IUser) => {
    return async (
        dispatch: Dispatch,
        getState: () => IAppState,
        apiService: IApiServices
    ) => {
        dispatch(createUserInitial())
        try {
            const response = await apiService.users.createUser(user)
            if (response.status !== 201) throw new Error('bad request')
            const addUserResponseId = user
            addUserResponseId.id = response.data.id
            dispatch(createUserSuccess(addUserResponseId))
        } catch (error) {
            dispatch(createUserError())
        }
    }
}

export const updateUser = (user: IUser) => {
    return async (
        dispatch: Dispatch,
        getState: () => IAppState,
        apiService: IApiServices
    ) => {
        dispatch(updateUserInitial())
        try {
            const response = await apiService.users.updateUser(user)
            if (response.status !== 200) throw new Error('bad request')
            dispatch(updateUserSuccess(user))
        } catch (error) {
            dispatch(updateUserError())
        }
    }
}

export const deleteUser = (id: number) => {
    return async (
        dispatch: Dispatch,
        getState: () => IAppState,
        apiService: IApiServices
    ) => {
        dispatch(deleteUserInitial())
        try {
            const response = await apiService.users.deleteUser(id)
            if (response.status !== 204) throw new Error('bad request')
            dispatch(deleteUserSuccess(id))
        } catch (error) {
            dispatch(deleteUserError())
        }
    }
}
