import { AppBar, Toolbar } from '@mui/material';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <AppBar>
      <Toolbar className='toolbar'>
        <NavLink to='/' style={linkStyle} className='link'>Customers </NavLink>
        <NavLink to='/trainings' style={linkStyle}  className='link'>Trainings</NavLink>
      </Toolbar>
    </AppBar>
      <Routes>
        <Route exact path='/' element={<CustomerList />} />
        <Route exact path='/trainings' element={<TrainingList />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

const linkStyle = ({ isActive }) => {
  return {
    textDecoration: 'none', 
    marginLeft: 100, 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 24,
  };
}

export default App;
