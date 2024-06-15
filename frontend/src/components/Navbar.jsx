import * as React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Link } from "react-router-dom";
import { Button } from '@mui/material';

import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout'

function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    const { logout } = useLogout()
    const { user } = useAuthContext()

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
              sx={{ mr: 2 }}
            >
            <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}  
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}      
            >
              <MenuItem onClick={handleClose} component={Link} to="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/create">
                Create lesson
              </MenuItem>
              <MenuItem onClick={handleClose}>
                About Me
              </MenuItem>

              {user && 
                <MenuItem onClick={() => logout()}>
                  Log out
                </MenuItem>
              }

              {!user && <MenuItem onClick={handleClose} component={Link} to="/login">Log in</MenuItem>}
              {!user && <MenuItem onClick={handleClose} component={Link} to="/signup">Sign up</MenuItem>}              
              
            </Menu>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yoga constructor
            </Typography>
            
          </Toolbar>
        </AppBar>
      </Box>
    )
}



export default Navbar;