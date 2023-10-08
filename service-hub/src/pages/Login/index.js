import React from 'react';
import { Button, Container, Typography, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom'; // Importa el Link de react-router-dom
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
  const classes = useStyles();

  const handleLoginClick = () => {
    // Aquí puedes agregar la lógica de autenticación si la tienes.
    // Por ahora, simplemente llamaremos a onLogin para cambiar el estado.
    onLogin();
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
          />
        </Grid>
        <Grid item xs={12}>
          <SimplePasswordField
            className={classes.textField}
            label="Contraseña"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleLoginClick}
        component={Link}
        to="/"
      >
        Iniciar Sesión
      </Button>
      <Button
        className={classes.button}
        color="primary"
        component={Link}
        to="/forgot-password"
      >
        ¿Olvidaste tu contraseña?
      </Button>
      <Typography variant="body1" className={classes.button}>
        ¿Todavía no tienes una cuenta? <Link to="/registro">Regístrate</Link>
      </Typography>
    </Container>
  );
}

export default LoginPage;
