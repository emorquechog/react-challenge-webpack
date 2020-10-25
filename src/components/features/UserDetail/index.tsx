import * as React from 'react'
import { IUser } from 'store/users/models'
import withQuery from 'components/hoc/withQuery'
import styles from './userDetail.module.scss'

interface IUserDetail {
    userDetail: IUser
    onFetchUser: (id: number) => void
    onClearUserDetail: () => void
    queryParams: any
}

const UserDetail: React.FC<IUserDetail> = ({
    userDetail,
    onFetchUser,
    onClearUserDetail,
    queryParams
}) => {
    const runFetch = React.useCallback(() => {
        onFetchUser(queryParams.id)
    }, [onFetchUser, queryParams])

    React.useEffect(() => {
        runFetch()
    }, [runFetch])

    React.useEffect(() => {
        return () => {
            onClearUserDetail()
        }
    }, [onClearUserDetail])

    return (
        <div className={styles.container}>
            <img src={userDetail.avatar} alt="avatar" />
            <span>First Name: {userDetail.first_name}</span>
            <span>Last Name: {userDetail.last_name}</span>
            <span>Email: {userDetail.email}</span>
        </div>
    )
}

export default withQuery(UserDetail)
