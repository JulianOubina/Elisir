import React, { useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import mockDataBaseUserCredentials from '../../data/mockDataBaseUserCredentials';
import SimplePasswordField from '../../components/form/SimplePasswordField';
import ControlledPasswordField from '../../components/form/ControlledPasswordField';
import NotificationRed from '../../components/ui/NotificationRed';
import NotificationGreen from '../../components/ui/NotificationGreen';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
  title: {
    margin: theme.spacing(1),
  },
}));

function ChangePasswordPage() {
  const classes = useStyles();
  const query = useQuery();
  const email = query.get('email');
  const [originalPassword, setOriginalPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);
  const [notificationGreenMessage, setNotificationGreenMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const userCredentials = mockDataBaseUserCredentials.find(
      (user) => user.email === email
    );

    // TODO: Descomentar la siguiente línea para que funcione la validación de la contraseña original. (Está comentada para que no moleste en el desarrollo)
    // eslint-disable-next-line
    if ((!userCredentials || userCredentials.password !== originalPassword) && false) {
      setNotificationRedMessage('Contraseña original incorrecta.');
      setNotificationRedOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setNotificationRedMessage('Las contraseñas ingresadas no coinciden.');
      setNotificationRedOpen(true);
      return;
    }

    // Aquí puedes agregar la lógica para restablecer la contraseña en la base de datos.
    setNotificationGreenMessage('Contraseña modificada con exito!');
    setNotificationGreenOpen(true);
  };

  return (
    <Container className={classes.root}>
      <Typography className={classes.title} variant="h4" gutterBottom>
        Modificar Contraseña
      </Typography>
      <form onSubmit={handleSubmit}>
        <SimplePasswordField
          className={classes.textField}
          label="Contraseña Original"
          value={originalPassword}
          onChange={(event) => setOriginalPassword(event.target.value)}
          sx={{ mb: 2 }}
        />
        <ControlledPasswordField
          className={classes.textField}
          label="Nueva Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{ mb: 2 }}
        />
        <SimplePasswordField
          className={classes.textField}
          label="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Confirmar
        </Button>
      </form>
      <NotificationRed
        open={notificationRedOpen}
        message={notificationRedMessage}
        onClose={() => setNotificationRedOpen(false)}
      />
      <NotificationGreen
        open={notificationGreenOpen}
        message={notificationGreenMessage}
        onClose={() => setNotificationGreenOpen(false)}
      />
    </Container>
  );
}

export default ChangePasswordPage;
