import * as React from 'react'
import AddIcon from '@material-ui/icons/Add'
import { IUser } from 'store/users/models'
import Card from 'components/UI/Card'
import AddUser from './Add'
import EditUser from './Edit'
import styles from './userList.module.scss'

interface IUserList {
    userList: IUser[]
    onFetchUsers: () => void
    onCreateUser: (user: IUser) => void
    onUpdateUser: (user: IUser) => void
    onDeleteUser: (id: number) => void
}

interface IUserState {
    openDialog: boolean
    openEditDialog: boolean
    userEditable: IUser
}

class UserList extends React.Component<IUserList, IUserState> {
    constructor(props: IUserList) {
        super(props)
        this.state = {
            openDialog: false,
            openEditDialog: false,
            userEditable: {
                id: 0,
                email: '',
                first_name: '',
                last_name: '',
                avatar: ''
            }
        }
    }

    componentDidMount() {
        const { onFetchUsers } = this.props
        onFetchUsers()
    }

    handleOpenDialog = (isOpen: boolean) => {
        this.setState({
            openDialog: isOpen
        })
    }

    handleEditDialog = (user: IUser) => {
        this.setState({
            openEditDialog: true,
            userEditable: user
        })
    }

    handleEditDialogClose = () => {
        this.setState({
            openEditDialog: false
        })
    }

    render() {
        const {
            userList,
            onCreateUser,
            onDeleteUser,
            onUpdateUser
        } = this.props
        const { openDialog, openEditDialog, userEditable } = this.state
        return (
            <div className={styles.container}>
                {userList.map(user => (
                    <Card
                        user={user}
                        onClickEdit={() => this.handleEditDialog(user)}
                        onClickDelete={() => onDeleteUser(user.id)}
                        key={user.id}
                    />
                ))}
                <div className={styles.addButton}>
                    <AddIcon onClick={() => this.handleOpenDialog(true)} />
                    <AddUser
                        openDialog={openDialog}
                        onCloseDialog={this.handleOpenDialog}
                        onAcceptPromp={onCreateUser}
                    />
                    <EditUser
                        openDialog={openEditDialog}
                        onCloseDialog={this.handleEditDialogClose}
                        onAcceptPromp={onUpdateUser}
                        user={userEditable}
                    />
                </div>
            </div>
        )
    }
}

export default UserList
