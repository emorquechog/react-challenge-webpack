import * as React from 'react'
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { IUser } from 'store/users/models'
import styles from './card.module.scss'

interface IUserList {
    user: IUser
    onClickEdit: () => void
    onClickDelete: () => void
}

const Card: React.FC<IUserList> = ({ user, onClickEdit, onClickDelete }) => {
    return (
        <div className={styles.container}>
            <Link to={{ pathname: '/detail', search: `?id=${user.id}` }}>
                <div>
                    <img
                        src={user.avatar}
                        alt="avatar"
                        height={125}
                        width={148}
                    />
                </div>
            </Link>
            <div>
                <span>{`${user.first_name} ${user.last_name}`}</span>
                <span>{user.email}</span>
                <div>
                    <EditIcon onClick={onClickEdit} />
                    <DeleteIcon onClick={onClickDelete} />
                </div>
            </div>
        </div>
    )
}

export default Card
