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

interface AddUser {
    openDialog: boolean
    onCloseDialog: (open: boolean) => void
    onAcceptPromp: (user: IUser) => void
}
const AddUser: React.FC<AddUser> = ({
    openDialog,
    onCloseDialog,
    onAcceptPromp
}) => {
    const [email, setEmail] = React.useState<string>('')
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [avatar, setAvatar] = React.useState<string>('')
    const handleAssignEntity = () => {
        const user: IUser = {
            id: 0,
            email,
            first_name: firstName,
            last_name: lastName,
            avatar
        }
        onAcceptPromp(user)
        onCloseDialog(false)
    }
    const handleChangeInput = (event: any) => {
        setAvatar(URL.createObjectURL(event.target.files[0]))
    }
    return (
        <Dialog open={openDialog} onClose={() => onCloseDialog(false)}>
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div className={styles.alignInputs}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            onChange={(evt: any) =>
                                setFirstName(evt.target.value)
                            }
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            onChange={(evt: any) =>
                                setLastName(evt.target.value)
                            }
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            onChange={(evt: any) => setEmail(evt.target.value)}
                        />
                    </div>
                    <br />
                    <input type="file" onChange={handleChangeInput} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onCloseDialog(false)} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => handleAssignEntity()}
                    color="primary"
                    autoFocus
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUser
