import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Pagination,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import mockServices from '../../data/mockServices';
import NotificationGreen from '../../components/ui/NotificationGreen';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#C0A1AE', // Fondo oscuro
  },
  button: {
    margin: theme.spacing(1),
  },
  card: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

function MyServices() {
  const classes = useStyles();
  const [services, setServices] = useState(mockServices);
  const [currentService, setCurrentService] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    tipo: '',
    duracion: '',
    frecuencia: '',
    costo: '',
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 9;
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const currentServices = services.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (Object.values(formData).some((value) => !value)) {
      setErrorMessage('Por favor, completa todos los campos del formulario.');
      return;
    }

    const newService = {
      id: currentService ? currentService.id : Date.now(),
      ...formData,
    };
    if (currentService) {
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === currentService.id ? newService : service
        )
      );
      setNotificationMessage('Información actualizada correctamente');
    } else {
      setServices((prevServices) => [...prevServices, newService]);
      setNotificationMessage('Servicio agregado correctamente');
    }

    setCurrentService(null);
    setNotificationOpen(true);
    setFormData({
      nombre: '',
      categoria: '',
      tipo: '',
      duracion: '',
      frecuencia: '',
      costo: '',
    });
    setDialogOpen(false);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Mis Servicios
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          setCurrentService(null);
          setFormData({
            nombre: '',
            categoria: '',
            tipo: '',
            duracion: '',
            frecuencia: '',
            costo: '',
          });
          setDialogOpen(true);
        }}
      >
        Agregar Servicio
      </Button>
      <Grid container spacing={3}>
        {currentServices.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{service.nombre}</Typography>
                <Typography variant="body2">
                  Duración: {service.duracion}
                </Typography>
                <Typography variant="body2">Costo: ${service.costo}</Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => {
                    setCurrentService(service);
                    setFormData({
                      nombre: service.nombre,
                      categoria: service.categoria,
                      tipo: service.tipo,
                      duracion: service.duracion,
                      frecuencia: service.frecuencia,
                      costo: service.costo,
                    });
                    setDialogOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setServices((prevServices) =>
                      prevServices.filter((s) => s.id !== service.id)
                    );
                    setNotificationMessage('Servicio eliminado correctamente');
                    setNotificationOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className={classes.paginationContainer}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
        />
      </div>
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setCurrentService(null);
          setDialogOpen(false);
        }}
      >
        <DialogTitle>
          {currentService ? 'Modificar Servicio' : 'Agregar Servicio'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
          <FormControl className={classes.formControl}>
            <InputLabel>Categoría</InputLabel>
            <Select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
            >
              <MenuItem value="tutorias">Tutorías escolares</MenuItem>
              <MenuItem value="idioma">Clases de idioma</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Tipo de clase</InputLabel>
            <Select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
            >
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="grupal">Grupal</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Duración (Horas Totales)"
            name="duracion"
            value={formData.duracion}
            onChange={handleInputChange}
          />
          <FormControl className={classes.formControl}>
            <InputLabel>Frecuencia</InputLabel>
            <Select
              name="frecuencia"
              value={formData.frecuencia}
              onChange={handleInputChange}
            >
              <MenuItem value="única">Única</MenuItem>
              <MenuItem value="semanal">Semanal</MenuItem>
              <MenuItem value="mensual">Mensual</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Costo"
            name="costo"
            value={formData.costo}
            onChange={handleInputChange}
          />
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
              setCurrentService(null);
              setErrorMessage('');
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            disabled={formData.duracion < 1 || formData.costo < 0}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <NotificationGreen
        open={notificationOpen}
        message={notificationMessage}
        onClose={() => {
          setCurrentService(null);
          setNotificationOpen(false);
        }}
      />
    </Container>
  );
}
export default MyServices;
