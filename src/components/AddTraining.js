import React, { useState, useEffect} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from "@mui/material";

export default function AddTraining ( { addTraining }) {

    const[open, setOpen] = useState(false); 
    const[trainings, setTrainings] = useState({
        date: '', 
        duration: '', 
        activity: '',
        customer: '' 
    });

    const[customer, setCustomer] = useState([]); 

    useEffect(() => { fetchCustomers(); }, [])
  
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else {
                throw new Error (response.status);
            }
        })
        .then(responseData => setCustomer(responseData.content))
        .catch(err => console.error(err))
    }

    const handleOpen = () => {
        setOpen(true); 
    }

    const handleClose = () => {
        setOpen(false); 
    }

    const handleChange = (event) => {
        setTrainings({...trainings, [event.target.name]: event.target.value}); 
    }

    const handleSave = () => {
        addTraining(trainings); 
        setTrainings({
            date: '', 
            duration: '', 
            activity: '', 
            customer: ''
        })
        setOpen(false); 
    }

    return (
        <>
        <Button variant="contained" onClick={handleOpen} style={{marginLeft: 1050}}>
            Add training
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a training</DialogTitle>
            <DialogContentText style={{marginLeft: 25}}>
                Training details
            </DialogContentText>
            <DialogContent>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <InputLabel variant="filled">Customer</InputLabel>
              <Select
                name='customer'
                value={trainings.customer}
                onChange={handleChange}
              >
                  {
                      customer.map((customer, index) => (
                          <MenuItem key={index.toString()} value={customer.links[0].href}>
                          {customer.firstname + ' ' + customer.lastname} </MenuItem>
                      ))
                  }
              </Select>
            </FormControl>
            
            <TextField 
            margin="dense"
            name="date"
            type='date'
            value={trainings.date}
            onChange={handleChange}
            label='Date'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="duration"
            value={trainings.duration}
            onChange={handleChange}
            label='Duration'
            fullWidth
            variant="standard"
            />
             <TextField 
            margin="dense"
            name="activity"
            value={trainings.activity}
            onChange={handleChange}
            label='Activity'
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