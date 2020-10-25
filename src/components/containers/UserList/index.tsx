import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { IAppState } from 'store'
import {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
} from 'store/users/actions'
import { IUser } from 'store/users/models'
import { ReadonlyNullable } from 'utilis/typingsGenerics'
import UserList from 'components/features/UserList'
import { AnyAction } from 'utilis/actionGenerics'

type AppState = ReadonlyNullable<IAppState>

function mapStateToProps({ user }: AppState) {
    return { userList: user.info }
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AnyAction>) {
    return {
        onFetchUsers: () => dispatch(fetchUsers()),
        onCreateUser: (user: IUser) => dispatch(createUser(user)),
        onUpdateUser: (user: IUser) => dispatch(updateUser(user)),
        onDeleteUser: (id: number) => dispatch(deleteUser(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList)
