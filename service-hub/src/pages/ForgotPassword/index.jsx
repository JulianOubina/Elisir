// This page will be used to reset the password of a user
// It will be accessed by clicking on the "Forgot Password" link on the login page

import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import emailRegex from '../../data/emailRegex';
import mockDatabaseMails from '../../data/mockDataBaseMails';
import { ROUTE_RESTORE_PASSWORD } from '../../data/pageRoutes';

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

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      setErrorMessage('Formato de correo electrónico no válido.');
      return;
    }

    if (!mockDatabaseMails.includes(email)) {
      setErrorMessage(
        'El correo electrónico ingresado no corresponde a un usuario.'
      );
      return;
    }

    setErrorMessage('');
    const resetLink = `${
      window.location.origin
    }${ROUTE_RESTORE_PASSWORD}?email=${encodeURIComponent(email)}`;

    // eslint-disable-next-line no-alert
    window.prompt(
      'Se ha enviado un correo para reestablecer tu contraseña. Copia el enlace a continuación y pégalo en tu navegador:',
      resetLink
    );
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3 }}
        >
          Reestablecer
        </Button>
      </form>
      <Typography variant="body1" sx={{ mt: 3 }}>
        Recordaste tu contraseña? <Link to="/login">Inicia sesion</Link>
      </Typography>
    </Container>
  );
}

export default ForgotPassword;
