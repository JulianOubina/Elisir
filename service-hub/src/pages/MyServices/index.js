import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
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
  Pagination,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ServiceCard from './ServiceCard';
import ServiceDetails from '../ServiceExplorer/ServiceDetails';
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
    varietal: '',
    tipo: '',
    volumen: '',
    bodega: '',
    costo: '',
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const userInfo = localStorage.getItem('userEmail');
  console.log(userInfo);

  useEffect(() => {
    fetch('http://localhost:3030/favs/myWines', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userInfo }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((misVinos) => {
        setServices(misVinos); // Set provider information with fetched data
        console.log(misVinos);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

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
      varietal: '',
      tipo: '',
      volumen: '',
      bodega: '',
      costo: '',
    });
    setDialogOpen(false);
  };

  // Estado para controlar el diálogo de contratación
  const handleHire = () => {
    setDialogOpen(true);
  };

  const [selectedService, setSelectedService] = useState(null);

  const handleRemoveFromFavorites = (serviceId) => {
    console.log(serviceId);
    console.log(services);
    setServices(services.filter((service) => service.name !== serviceId));
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Mis Vinos
      </Typography>
      {currentServices.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {currentServices.map((servicio) => (
              <ServiceCard
                key={servicio.name}
                service={servicio}
                onClick={setSelectedService}
                onHire={handleHire}
                onRemoveFromFavorites={() =>
                  handleRemoveFromFavorites(servicio.name)
                }
              />
            ))}
          </Grid>
          <div className={classes.paginationContainer}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
          </div>
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" p={3}>
          <Typography variant="h6">
            No existen vinos guardados como favoritos
          </Typography>
        </Box>
      )}
      <ServiceDetails
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onHire={handleHire}
      />
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setCurrentService(null);
          setDialogOpen(false);
        }}
      >
        <DialogTitle>
          {currentService ? 'Modificar Servicio' : 'Agregar Vino'}
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
            <InputLabel>Varietal</InputLabel>
            <Select
              name="varietal"
              value={formData.varietal}
              onChange={handleInputChange}
            >
              <MenuItem value="Malbec">Malbec</MenuItem>
              <MenuItem value="Chardonnay">Chardonnay</MenuItem>
              <MenuItem value="Malbec Rose">Malbec Rose</MenuItem>
              <MenuItem value="Cabernet Sauvignon">Cabernet Sauvignon</MenuItem>
              <MenuItem value="Merlot">Merlot</MenuItem>
              <MenuItem value="Syrah">Syrah</MenuItem>
              <MenuItem value="Pinot Noir">Pinot Noir</MenuItem>
              <MenuItem value="Sauvignon Blanc">Sauvignon Blanc</MenuItem>
              <MenuItem value="Tempranillo">Tempranillo</MenuItem>
              <MenuItem value="Garnacha">Garnacha</MenuItem>
              <MenuItem value="Viognier">Viognier</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Tipo</InputLabel>
            <Select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
            >
              <MenuItem value="Semi-seco">Semi-seco</MenuItem>
              <MenuItem value="Dulce">Dulce</MenuItem>
              <MenuItem value="Seco">Seco</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Volumen (ml)"
            name="volumen"
            value={formData.volumen}
            onChange={handleInputChange}
          />
          <FormControl className={classes.formControl}>
            <InputLabel>Bodega</InputLabel>
            <Select
              name="bodega"
              value={formData.bodega}
              onChange={handleInputChange}
            >
              <MenuItem value="Luigi Bosca">Luigi Bosca</MenuItem>
              <MenuItem value="Fond de Cave">Fond de Cave</MenuItem>
              <MenuItem value="Las Perdices">Las Perdices</MenuItem>
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
            disabled={formData.volumen < 1 || formData.costo < 0}
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
