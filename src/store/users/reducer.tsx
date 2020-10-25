import { ReadonlyNullable } from 'utilis/typingsGenerics'
import UsersActionType from './constants'
import { IUser } from './models'
import { Action } from './actions'

export interface IUserState {
    info: IUser[]
    loading: boolean
    error: string
    userDetail: IUser
    entityScope: 'edit' | 'add' | 'delete' | 'error' | 'initial'
}

const initialState: IUserState = {
    info: [],
    loading: false,
    error: '',
    entityScope: 'initial',
    userDetail: {
        avatar: '',
        email: '',
        first_name: '',
        id: 0,
        last_name: ''
    }
}
type UserStateProps = ReadonlyNullable<typeof initialState>

const userReducer = (
    state: UserStateProps = initialState,
    action: Action
): UserStateProps => {
    switch (action.type) {
        case UsersActionType.GET_USERS_SUCCESS:
            return {
                ...state,
                info: action.data,
                loading: false
            }
        case UsersActionType.GET_USERS_INITIAL:
            return {
                ...state,
                loading: true
            }
        case UsersActionType.GET_USERS_ERROR:
            return {
                ...state,
                loading: false,
                error: 'something is wrong'
            }
        case UsersActionType.GET_USER:
            return {
                ...state,
                userDetail: action.data,
                loading: false
            }
        case UsersActionType.CLEAR_USER_DETAIL:
            return {
                ...state,
                loading: false,
                userDetail: initialState.userDetail
            }
        case UsersActionType.CREATE_USER_INITIAL:
            return {
                ...state,
                loading: true
            }
        case UsersActionType.CREATE_USER_SUCCESS: {
            const cloneState = [...state.info, action.user]
            return {
                ...state,
                loading: false,
                entityScope: 'add',
                info: cloneState
            }
        }
        case UsersActionType.CREATE_USER_ERROR:
            return {
                ...state,
                loading: false,
                entityScope: 'error'
            }
        case UsersActionType.DELETE_USER_INITIAL:
            return {
                ...state,
                loading: true
            }
        case UsersActionType.DELETE_USER_SUCCESS: {
            const deleteUserIdx = state.info.findIndex(x => x.id === action.id)
            const cloneState = state.info
            cloneState.splice(deleteUserIdx, 1)
            return {
                ...state,
                loading: false,
                entityScope: 'delete',
                info: [...cloneState]
            }
        }
        case UsersActionType.DELETE_USER_ERROR:
            return {
                ...state,
                loading: false,
                entityScope: 'error'
            }
        case UsersActionType.UPDATE_USER_INITIAL:
            return {
                ...state,
                loading: true
            }
        case UsersActionType.UPDATE_USER_SUCCESS: {
            const index = state.info.findIndex(x => x.id === action.user.id)
            return {
                ...state,
                loading: false,
                entityScope: 'edit',
                info: state.info.map((content, i) =>
                    i === index ? { ...action.user } : content
                )
            }
        }
        case UsersActionType.UPDATE_USER_ERROR:
            return {
                ...state,
                loading: false,
                entityScope: 'error'
            }
        default:
            return state
    }
}

export default userReducer
