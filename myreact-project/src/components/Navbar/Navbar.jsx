/* import * as React from 'react'; */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { SessionContext } from '../../SessionContext/SessionContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';




 function Navbar() {

  const {isAuthenticated, logout  } = useContext(SessionContext)

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Ícone do menu */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* Título da Navbar */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FitnessStudio
          </Typography>

          {isAuthenticated ? (
          <>
          <Button color="inherit" onClick={() => navigate("myclasses")}>My Classes</Button>
          <Button color="inherit" onClick={() => navigate("/classes")}>All Classes</Button>
          <Button color="inherit" onClick={() => navigate("profile")}>Profile</Button>
          <Button color="inherit" onClick={logout}>Logout</Button> 
          </>
          ) : (
          <>
          <Button 
          color="inherit" 
          component={Link} 
          to="/login"
          >
            Login
          </Button>
          <Button 
          color="inherit"
          component={Link} 
          to="/signup"
          >
            Signup
          </Button>
          </>
          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;