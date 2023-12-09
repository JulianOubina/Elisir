import React, { useState } from 'react';
import { Button, Container, Typography, Grid, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Importa el Link de react-router-dom
import makeStyles from '@mui/styles/makeStyles';
import SimplePasswordField from '../../components/form/SimplePasswordField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

function LoginPage({ onLogin }) {
  // function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    const userData = {
      username,
      password,
    };

    // Envio los datos al backend
    // Por ejemplo, usando fetch para una solicitud POST:
    fetch('http://localhost:3030/user/login', {
      method: 'POST',
      credentials: 'include', // Necessary to include cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          onLogin();
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            label="Correo electrónico"
            variant="outlined"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <SimplePasswordField
            className={classes.textField}
            label="Contraseña"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Iniciar Sesión
      </Button>
      <Typography variant="body1" className={classes.button}>
        ¿Todavía no tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </Typography>
    </Container>
  );
}
export default LoginPage;
