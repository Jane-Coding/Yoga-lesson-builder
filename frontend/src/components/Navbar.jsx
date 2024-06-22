import { useState } from 'react';

import {Menu, 
  MenuItem, 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Link } from "react-router-dom";

import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout'

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
    setAnchorEl(null);
    };

    const { logout } = useLogout()
    const { user } = useAuthContext()

    const mobile = useMediaQuery("(max-width:599px)");
    const tablet = useMediaQuery("(min-width:600px)");

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="secondary">
            {mobile && 
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

                  {user && 
                    <MenuItem onClick={handleClose} component={Link} to="/create">
                      Create lesson
                    </MenuItem>
                  }

                  <MenuItem onClick={handleClose} component={Link} to="/about">
                    About Me
                  </MenuItem>

                  {user && 
                    <MenuItem sx={{color: 'secondary.main'}} onClick={() => logout()}>
                      Log out
                    </MenuItem>
                  }
                  
                </Menu>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Yoga lesson builder
                </Typography>
                
              </Toolbar>
            }

            {tablet &&
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Button sx={{color: 'white'}} onClick={handleClose} component={Link} to="/">
                    Home
                  </Button>

                  {user &&
                    <Button sx={{color: 'white'}} onClick={handleClose} component={Link} to="/create">
                      Create lesson
                    </Button>
                  }
                  
                  <Button sx={{color: 'white'}} onClick={handleClose} component={Link} to="/about">
                    About Me
                  </Button>
                  {user && 
                    <Button sx={{color: 'white'}} onClick={() => logout()}>
                      Log out
                    </Button>
                  }
                  <Typography variant="h6" component="div" sx={{ ml: 'auto', p: 2 }}>
                    Yoga lesson builder
                  </Typography>
              </Box>            
            }
        </AppBar>
      </Box>
    )
}



export default Navbar;