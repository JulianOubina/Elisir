import React, { useState } from 'react';
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
import mockProvider from '../../data/mockProvider';
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
  const [isEditing, setIsEditing] = useState(false);
  const [providerInfo, setProviderInfo] = useState(mockProvider); // Variable de estado para la información del proveedor
  const [updatedProvider, setUpdatedProvider] = useState(mockProvider);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProvider((prev) => ({ ...prev, [name]: value }));
  };

  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleSave = () => {
    setProviderInfo(updatedProvider); // Actualizar la información del proveedor
    setIsEditing(false);
    setNotificationOpen(true); // Mostrar la notificación
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Perfil del Proveedor
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} md={3}>
          <Avatar
            alt={`${providerInfo.firstName} ${providerInfo.lastName}`}
            src={providerInfo.profileImage}
            className={classes.largeAvatar}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h5">{`${providerInfo.firstName} ${providerInfo.lastName}`}</Typography>
          <Typography variant="subtitle1">{providerInfo.title}</Typography>
          <Typography variant="subtitle2">{`E-mail: ${providerInfo.email}`}</Typography>
          <Typography variant="string">{`Tel: ${providerInfo.phoneNumber}`}</Typography>
        </Grid>
      </Grid>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">Sobre mí:</Typography>
          <Typography variant="body2">{providerInfo.experience}</Typography>
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => setIsEditing(true)}
          >
            Editar
          </Button>
        </Grid>
      </Grid>
      {/* Formulario de edición */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Editar Perfil</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.firstName}
            name="firstName"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Apellido"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.lastName}
            name="lastName"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Mail"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.email}
            name="mail"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Nro Télefono"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.phoneNumber}
            name="phoneNumber"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedProvider.title}
            name="title"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Experiencia"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4} // Aquí especificas cuántas líneas quieres que se muestren
            value={updatedProvider.experience}
            name="experience"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} color="primary">
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
