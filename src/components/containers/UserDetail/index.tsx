import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IAppState } from 'store'
import { fetchUser, clearUserDetail } from 'store/users/actions'
import { ReadonlyNullable } from 'utilis/typingsGenerics'
import UserDetail from 'components/features/UserDetail'
import { AnyAction } from 'utilis/actionGenerics'

type AppState = ReadonlyNullable<IAppState>

function mapStateToProps({ user }: AppState) {
    return { userDetail: user.userDetail }
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        onFetchUser: (id: number) => dispatch(fetchUser(id)),
        onClearUserDetail: () => dispatch(clearUserDetail())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
