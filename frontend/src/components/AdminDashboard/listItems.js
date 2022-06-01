import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutButton from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";


const AdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    navigate('/');
  }

  return (
    <button className="navButton" onClick={() => { handleLogout() }}>Logout</button>
  );
};

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton >
        <AdminLogout />
    </ListItemButton>
  </React.Fragment>
);