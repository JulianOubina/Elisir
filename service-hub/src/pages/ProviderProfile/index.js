import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Typography,
  Grid,
  Avatar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
} from '@mui/material';

import LiquorIcon from '@mui/icons-material/Liquor';
import WineBarIcon from '@mui/icons-material/WineBar';
import StoreIcon from '@mui/icons-material/Store';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';

import makeStyles from '@mui/styles/makeStyles';
import LinearProgress from '@mui/material/LinearProgress';
import NotificationGreen from '../../components/ui/NotificationGreen';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#C0A1AE',
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
  const [meli, setmeli] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [notificationOpen]);

  const [updatedProvider, setUpdatedProvider] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProvider((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
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
        <Grid item xs={12}>
          <Avatar
            alt={`${providerInfo.user.nombre}`}
            src="/static/images/avatar/2.jpg"
            className={classes.largeAvatar}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">{`${providerInfo.user.nombre}`}</Typography>
          <Typography variant="subtitle2">{`E-mail: ${providerInfo.user.username}`}</Typography>
        </Grid>
      </Grid>
      <List>
        {providerInfo.user.usuarioMeli && (
          <>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText
                primary="Perfil de MercadoLibre"
                secondary={
                  <a
                    href={`https://www.mercadolibre.com.ar/perfil/${providerInfo.user.usuarioMeli}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {providerInfo.user.usuarioMeli}
                  </a>
                }
              />
            </ListItem>
          </>
        )}
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <LiquorIcon />
          </ListItemIcon>
          <ListItemText
            primary="Bodega Favorita"
            secondary={providerInfo.user.bodegaFav}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <LocalDrinkIcon />
          </ListItemIcon>
          <ListItemText
            primary="Varietal Preferido"
            secondary={providerInfo.user.varietal}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <WineBarIcon />
          </ListItemIcon>
          <ListItemText
            primary="Indice de Experiencia"
            secondary={
              <LinearProgress
                variant="determinate"
                value={providerInfo.user.experiencia * 10}
              />
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
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
