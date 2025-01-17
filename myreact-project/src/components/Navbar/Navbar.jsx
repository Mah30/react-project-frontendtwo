import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import logo from '../../assets/images/logo.png';

/* import Sidebar from './components/Sidebar/Sidebar'; */

function Navbar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (


    <Box sx={{ 
      flexGrow: 1,
      }}
    >
      <AppBar 
      position="static"
      sx = {{backgroundColor: '#003049'}}>
        <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        
         {/* Botao sidebar */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={toggleDrawer('left', true)}
          >
          <MenuIcon />

        <Link to="/homepage">
          <Box 
          component="img" 
          src={logo} 
          alt="Logo" 
          sx={{ 
            height: 50, 
            width: 50, 
            flexGrow: 1 , 
            variant:"h6",
            marginLeft: 2       
          }} />
        </Link>
   
          </IconButton>

          <Typography 
              variant="h6" 
              component="div" 
              sx={{ flexGrow: 1 }}>    
            M'ART's Courses
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
          
          className={styles.changeColor}
          color="inherit" 
          component={Link} 
          to="/homepage"
          sx = {{textTransform: 'Capitalize'}}
          >
            Home
          </Button>

          <Button 
          className={styles.changeColor}
          color="inherit" 
          component={Link} 
          to="/aboutpage"
          sx = {{textTransform: 'Capitalize'}}
          >
            About
          </Button>

          <Button 
          className={styles.changeColor}
          color="inherit" 
          component={Link} 
          to="/coursepage"
          sx = {{textTransform: 'Capitalize'}}
          >
            Courses
          </Button>

          <Button
          className={styles.changeColor}
          color="inherit" 
          component={Link} 
          to="/new"
          sx = {{textTransform: 'Capitalize'}}
          >
            New
          </Button>
          
          <Button 
          className={styles.changeColor}
          color="inherit" 
          component={Link} 
          to="/talktous"
          sx = {{textTransform: 'Capitalize'}}
          >
            Contact
          </Button>



          <Button
            color="primary"
            variant="contained"
            startIcon={<LoginIcon />} 
            sx={{ 
              textTransform: 'capitalize',
              backgroundColor: '#1976d2', 
              color: 'white', 
            /*   borderRadius: '8px', */
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#bc3908', 
              },
            }}
            component={Link}
            to="/login"
          >
            Login
          </Button>

          <Button
            color="primary"
            /* variant="outlined" */
            variant="contained"
            startIcon={<PersonAddIcon />}
            sx={{
              textTransform: 'capitalize',
              backgroundColor: '#1976d2', 
              color: 'white', 
            /*   borderRadius: '8px', */
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#bc3908', 
              },
            }}
            component={Link}
            to="/register"
          >
            Register
          </Button>

          </Box>
           
        </Toolbar>
      </AppBar>

      <Sidebar state = {state} setState = {setState} toggleDrawer = {toggleDrawer}></Sidebar>
    </Box>
  );
}

export default Navbar;
