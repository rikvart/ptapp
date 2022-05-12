import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';


import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-material.css";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";


export default function Customerlist () {
    
    const[customers, setCustomers] = useState([]);
    const[open, setOpen] = useState(false); 
    const[message, setMessage] = useState(''); 

    
    useEffect(() => { fetchCustomers(); }, [])

   
    const fetchCustomers = () => {
        fetch(process.env.REACT_APP_API_CUSTOMERS)
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else {
                throw new Error (response.status);
            }
        })
        .then(responseData => setCustomers(responseData.content))
        .catch(err => console.error(err))
    }

    const addCustomer = (newCustomer) => {
        fetch(process.env.REACT_APP_API_CUSTOMERS, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(newCustomer)
        })
        .then(response => {
            if(response.ok) {
                fetchCustomers();
                setMessage('Customer added successfully')
            } else {
                alert('Something went wrong!')
            }
        })
        .catch(err => console.error(err))
    }

    const editCustomer = (editedCustomer, link) => {
        fetch(link[0].href, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json'}, 
            body: JSON.stringify(editedCustomer)
        })
        .then(response => {
            if(response.ok) {
                setOpen(true);
                setMessage('Customer updated successfully'); 
                fetchCustomers(); 
            } else {
                alert('Someting went wrong!')
            }
        })
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if(window.confirm('Are you sure that you want to delete this customer?')) {
            fetch(link.data.links[0].href, {method: 'DELETE'})
            .then(response => {
                if(!response.ok) {
                    alert('Something went wrong in deletion!') 
                } else {
                    setOpen(true);
                    setMessage('Customer deleted successfully') 
                    fetchCustomers();
                }
            })
            .catch(err => console.error(err))
        }
    }

    const [columns] = useState([
        {headerName: 'First name', field: 'firstname', width: 130},
        {headerName: 'Last name', field: 'lastname', width: 130}, 
        {headerName: 'Street address', field: 'streetaddress', width: 175}, 
        {headerName: 'Postal code', field: 'postcode', width: 175},
        {headerName: 'City', field: 'city', width: 130}, 
        {headerName: 'Email', field: 'email', width: 175}, 
        {headerName: 'Phone number', field: 'phone', width: 175},
        {
            headerName: '', 
            field: 'links',
            width: 80, 
            cellRenderer: params =>
            <EditCustomer params={params} editCustomer={editCustomer}/> 
        },
        {
            headerName: '', 
            field: 'links',
            width: 80, 
            cellRenderer: params => 
            <IconButton onClick={() => deleteCustomer(params)}>
                <DeleteIcon color="error"/>
            </IconButton>
        }
    ]);

    const defaultColumnProps = useMemo(() => ({
        sortable: true,
        filter: true
    }), []);

    return (
        <div className="ag-theme-material" style={{ height: 500, width: '90%', margin: 70}}>
            <AddCustomer addCustomer={addCustomer} />
            <AgGridReact
            defaultColDef={defaultColumnProps}
            columnDefs={columns}
            rowData={customers}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}    
            />
            <Snackbar 
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </div>
        ); 
};