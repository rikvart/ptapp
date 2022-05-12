import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react"; 
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import { format, parseISO } from "date-fns";
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-material.css";
import AddTraining from "./AddTraining";

export default function TrainingList () {

    const[trainings, setTrainings] = useState([]);
    const[open, setOpen] = useState(false);

    useEffect(() => { fetchTrainings(); }, [])
    
    const fetchTrainings = () => {
        fetch(process.env.REACT_APP_API_CUSTOMERS_TRAININGS)
        .then(response => {
            if(response.ok) {
                return response.json(); 
            } else throw new Error (response.status)
        })
        .then(responseData => 
            setTrainings(responseData)
            )
        .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch(process.env.REACT_APP_API_TRAININGS, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'}, 
            body: JSON.stringify(newTraining)
        })
        .then(response => {
            if(response.ok) {
                fetchTrainings(); 
            } else {
                alert('Something went wrong!')
            }
        })
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if(window.confirm('Are you sure that you want to delete this training?')) {
            fetch(process.env.REACT_APP_API_TRAININGS + '/' + link.data.id, {
                method: 'DELETE'
            })
            .then(response => {
                if(response.ok) {
                    fetchTrainings();
                    setOpen(true);  
                } else {
                    alert('Something went wrong!'); 
                }
            })
            .catch(err => console.error(err))
        }
    }

    const [columns] = useState([
        {headerName: 'Date', field: 'date', filter: 'agDateColumnFilter',
        cellRenderer: (params) =>
        format(parseISO(params.data.date), "dd.MM.yyyy"),
        },
        {headerName: 'Duration (min)', field: 'duration'},
        {headerName: 'Activity', field: 'activity'}, 
        {headerName: 'Customer', valueGetter(params) { return params.data.customer.firstname + ' ' + params.data.customer.lastname}},
        {
            headerName: '', 
            field: 'links.href',
            width: 80, 
            cellRenderer: params => 
            <IconButton onClick={() => deleteTraining(params)}>
                <DeleteIcon color="error"/>
            </IconButton>
        }
    ])

    const defaultColumnProps = useMemo(() => ({
        sortable: true,
        filter: true
    }), []); 

    return (

    <div className="ag-theme-material" style={{ height: 550, width: '90%', margin: 100}}>
        <AddTraining addTraining={addTraining}/>
        <AgGridReact
        defaultColDef={defaultColumnProps}
        columnDefs={columns}
        rowData={trainings}
        pagination={true}
        paginationPageSize={10}
        suppressCellFocus={true}
        />
         <Snackbar 
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message='Training deleted successfully!'
            />
    </div>
    ); 
};