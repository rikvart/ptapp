import React, { useState, useEffect } from react;
import { CSVLink } from react-csv;

const ExportCSV = () => {

const { fileData, setFileData } = useState();
 
const [fileHeaders] = useState([
    {headerName: 'First name', key: 'firstname'},
    {headerName: 'Last name', key: 'lastname'}, 
    {headerName: 'Street address', key: 'streetaddress'}, 
    {headerName: 'Postal code', key: 'postcode'},
    {headerName: 'City', key: 'city'}, 
    {headerName: 'Email', key: 'email'}, 
    {headerName: 'Phone number', key: 'phone'}
]);
};


const handleDataFetch = async() => {
    const response = await fetch(process.env.REACT_APP_API_CUSTOMERS);
    const respJSON = await response.json();
    setFileData(respJSON)
  };

  useEffect(()=>{
    handleDataFetch();
  }, [])
 
 

return (
        <div>
          <h3>Export to CSV</h3>
          {fileData?.length &&
            <CSVLink
              headers={fileHeaders}
              data={fileData}
              filename="results.csv"
              target="_blank"
            >
              Export
            </CSVLink>
          }
        </div>
      );


export default ExportCSV;
