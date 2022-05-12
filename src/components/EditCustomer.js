import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



export default function EditCustomer( { params, editCustomer }) {

    const [customer, setCustomer] = useState({
        firstname: '', 
        lastname: '', 
        streetaddress: '', 
        postcode: '', 
        city: '', 
        email: '', 
        phone: ''
    })

    const[open, setOpen] = useState(false); 
    const handleClickOpen = () => {
        setCustomer({
            firstname: params.data.firstname, 
            lastname: params.data.lastname, 
            streetaddress: params.data.streetaddress, 
            postcode: params.data.postcode, 
            city: params.data.city, 
            email: params.data.email, 
            phone: params.data.phone
        })
        setOpen(true); 
    }

    const handleClose = () => {
        setOpen(false); 
    }

    const handleSave = () => {
        editCustomer(customer, params.value); 
        setOpen(false)   
    }

    const inputchanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return (
        <>
        <IconButton onClick={handleClickOpen}>
            <EditIcon color="primary"/>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit customer data</DialogTitle>
            <DialogContentText style={{marginLeft: 25}}>
            
            </DialogContentText>
            <DialogContent>
            <TextField 
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={inputchanged}
            label='First name'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={inputchanged}
            label='Last name'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputchanged}
            label='Street address'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={inputchanged}
            label='Postcode'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="city"
            value={customer.city}
            onChange={inputchanged}
            label='City'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="email"
            value={customer.email}
            onChange={inputchanged}
            label='Email'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={inputchanged}
            label='Phone'
            fullWidth
            variant="standard"
            />
        </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
        </Dialog>
        </>
    ); 
};