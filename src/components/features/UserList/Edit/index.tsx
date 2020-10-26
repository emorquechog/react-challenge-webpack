import * as React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { IUser } from 'store/users/models'
import styles from '../userList.module.scss'

interface IEditUser {
    openDialog: boolean
    onCloseDialog: () => void
    onAcceptPromp: (user: IUser) => void
    user: IUser
}
const EditUser: React.FC<IEditUser> = ({
    openDialog,
    onCloseDialog,
    onAcceptPromp,
    user
}) => {
    const [email, setEmail] = React.useState<string>('')
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [avatar, setAvatar] = React.useState<string>('')

    React.useEffect(() => {
        setEmail(user.email)
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setAvatar(user.avatar)
    }, [user])

    const handleAssignEntity = () => {
        const userValue: IUser = {
            id: user.id,
            email,
            first_name: firstName,
            last_name: lastName,
            avatar
        }
        onAcceptPromp(userValue)
        onCloseDialog()
    }
    const handleChangeInput = (event: any) => {
        setAvatar(URL.createObjectURL(event.target.files[0]))
    }

    return (
        <Dialog open={openDialog} onClose={() => onCloseDialog()}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div className={styles.alignInputs}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            onChange={(evt: any) =>
                                setFirstName(evt.target.value)
                            }
                            value={firstName}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            onChange={(evt: any) =>
                                setLastName(evt.target.value)
                            }
                            value={lastName}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            onChange={(evt: any) => setEmail(evt.target.value)}
                            value={email}
                        />
                    </div>
                    <br />
                    <input type="file" onChange={handleChangeInput} />
                    {avatar && (
                        <img
                            src={avatar}
                            alt="preview_avatar"
                            height={128}
                            width={148}
                        />
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onCloseDialog()} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => handleAssignEntity()}
                    color="primary"
                    autoFocus
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditUser
