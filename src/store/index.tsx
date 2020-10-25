import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { IUserState } from 'store/users/reducer'
import apiService from 'api'
import rootReducer from './reducers'

export interface IAppState {
    user: IUserState
}

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(apiService)))
)
