import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import serviceHubLogo from '../assets/Logos/Picture1.png';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  signUpButton: {},
  loginButton: {},
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#EEEFFB',
    elevation: 0,
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img
              src={serviceHubLogo}
              alt="ServiceHub Logo"
              style={{ height: '75px', marginRight: '15px' }}
            />
          </Link>
          <Link to="/explorar-servicios">
            <Button color="inherit">Explorar Servicios</Button>
          </Link>

          <Link to="/mis-servicios">
            <Button color="inherit">Mis Servicios</Button>
          </Link>

          <Link to="/comentarios">
            <Button color="inherit">Comentarios</Button>
          </Link>

          <Link to="/contrataciones">
            <Button color="inherit">Contrataciones</Button>
          </Link>

          <Link to="/login">
            <Button color="inherit">Iniciar Sesión</Button>
          </Link>

          <Link to="/registro">
            <Button color="inherit">Registrarse</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;
