import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import NotificationGreen from '../../components/ui/NotificationGreen';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  card: {
    marginTop: theme.spacing(2),
  },
}));

function ProviderProfile() {
  const classes = useStyles();
  const [providerInfo, setProviderInfo] = useState({});
  useEffect(() => {
    fetch('http://localhost:3030/user', { credentials: 'include' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((user) => {
        setProviderInfo(user); // Set provider information with fetched data
        console.log(providerInfo);
        console.log(user);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [providerInfo]);

  const [meli, setmeli] = useState(false);
  const [updatedProvider, setUpdatedProvider] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProvider((prev) => ({ ...prev, [name]: value }));
  };

  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleSave = () => {
    console.log(updatedProvider);
    fetch('http://localhost:3030/user/meli', {
      method: 'POST',
      credentials: 'include', // Necessary to include cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: providerInfo.user.username,
        userMeli: updatedProvider.nickName,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
    setmeli(false);
    setNotificationOpen(true); // Mostrar la notificación
  };

  if (!providerInfo.user) {
    // Loading state, or return null, or a spinner etc.
    return <div>Loading...</div>;
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} md={3}>
          <Avatar
            alt={`${providerInfo.user.nombre}`}
            src="/static/images/avatar/2.jpg"
            className={classes.largeAvatar}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h5">{`${providerInfo.user.nombre}`}</Typography>
          <Typography variant="subtitle2">{`E-mail: ${providerInfo.user.username}`}</Typography>
          <div>
            <Typography variant="string">{`ML NickName: ${providerInfo.user.usuarioMeli}`}</Typography>
          </div>
        </Grid>
      </Grid>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">Sobre mí:</Typography>
          <Typography variant="body2">
            {providerInfo.user.experiencia}
          </Typography>
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => setmeli(true)}
          >
            Perfil de Proveedor
          </Button>
        </Grid>
      </Grid>
      {/* Formulario Meli */}
      <Dialog open={meli} onClose={() => setmeli(false)}>
        <DialogTitle>Agregar Perfil de Mercado Libre</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nickname"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.usuarioMeli}
            name="nickName"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setmeli(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <NotificationGreen
        open={notificationOpen}
        message="Información actualizada"
        onClose={() => setNotificationOpen(false)}
      />
    </Container>
  );
}

export default ProviderProfile;
