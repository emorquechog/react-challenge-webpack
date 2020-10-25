import { combineReducers } from 'redux'
import user from 'store/users/reducer'

const appReducer = combineReducers({
    user
})

const rootReducer = (state: any, action: any) => appReducer(state, action)

export default rootReducer
