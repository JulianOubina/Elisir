import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Typography,
  Grid,
  Pagination,
  TextField,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DynamicSelect from '../../components/form/DynamicSelect';
import ServiceCard from './ServiceCard';
import ServiceDetails from './ServiceDetails';
import useStyles from '../../styles/styles';
import NotificationRed from '../../components/ui/NotificationRed';
import NotificationGreen from '../../components/ui/NotificationGreen';
import ContratacionForm from './ContratacionForm';

function ServiceExplorer() {
  const classes = useStyles();

  // Estados lista de servicios y filtrada
  const [servicios, setServicios] = useState([]);
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

  // Fetch data from MercadoLibre API
  useEffect(() => {
    const MELI_API_URL =
      'https://api.mercadolibre.com/sites/MLA/search?category=MLA1404&units_per_pack=[1-1]&SALE_FORMAT=1359391&UNIT_VOLUME=(*-1L)';

    const fetchData = async () => {
      try {
        const response = await fetch(MELI_API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setServicios(data.results);
        setServiciosFiltrados(data.results); // Assuming you want to initially show all results
      } catch (error) {
        console.error('Could not fetch data from MercadoLibre API', error);
      }
    };

    fetchData();
  }, []);

  // Estados para los filtros
  const [varietalFiltro, setvarietalFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [bodegaFiltro, setBodegaFiltro] = useState('');
  const [conStock, setConStock] = useState(false);

  // Estados para los campos del formulario de contratación
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [horario, setHorario] = useState({ inicio: '', fin: '' });
  const [mensaje, setMensaje] = useState('');

  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const servicesPerPage = 6;
  const totalPages = Math.ceil(serviciosFiltrados.length / servicesPerPage);

  const currentServices = serviciosFiltrados.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  // Estado para controlar el diálogo de contratación
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleHire = () => {
    setDialogOpen(true);
  };

  // Estados para controlar las notificaciones
  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);

  // Función para resetear el formulario de contratación
  const resetFormContratacion = () => {
    setTelefono('');
    setEmail('');
    setHorario({ inicio: '', fin: '' });
    setMensaje('');
  };

  // Función para verificar si todos los campos del formulario están completos
  const isFormComplete = () => {
    return telefono && email && horario.inicio && horario.fin && mensaje;
  };

  // Función para validar un número de teléfono
  const isValidPhoneNumber = (phoneNumber) => {
    const pattern = /^[0-9]{10}$/; // Asume un número de 10 dígitos
    return pattern.test(phoneNumber);
  };

  // Función para validar un correo electrónico
  const isValidEmail = () => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
  };

  // Generar las opciones de horario en intervalos de 30 minutos
  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i += 1) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, '0');
        const minute = j.toString().padStart(2, '0');
        options.push(`${hour}:${minute}hs`);
      }
    }
    return options;
  };

  // Variable para la barra de busqueda
  /*   const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }; */

  // Función para validar que la hora de finalización sea mayor que la hora de inicio y otras validaciones
  const CheckTime = () => {
    if (!isValidPhoneNumber(telefono)) {
      setNotificationRedMessage(
        'Por favor, ingrese un número de teléfono válido'
      );
      setNotificationRedOpen(true);
      return;
    }

    if (!isValidEmail(email)) {
      setNotificationRedMessage(
        'Por favor, ingrese un correo electrónico válido'
      );
      setNotificationRedOpen(true);
      return;
    }

    if (horario.fin <= horario.inicio) {
      setNotificationRedMessage(
        'La hora de finalización debe ser mayor que la hora de inicio'
      );
      setNotificationRedOpen(true);
      return;
    }

    // Si todas las validaciones pasan, mostrar notificación de éxito
    setNotificationGreenOpen(true);
    setDialogOpen(false);
    resetFormContratacion();
  };

  // Funcion de filtrado
  const filtrarServicios = () => {
    const filtrados = servicios.filter((servicio) => {
      const cumpleFiltros =
        /*         (!searchValue || servicio.nombre.includes(searchValue)) &&
         */ (!varietalFiltro || servicio.varietal === varietalFiltro) &&
        (!tipoFiltro || servicio.tipo === tipoFiltro) &&
        (!bodegaFiltro || servicio.bodega === bodegaFiltro);
      return conStock ? cumpleFiltros && servicio.enStock : cumpleFiltros;
    });
    setServiciosFiltrados(filtrados);
  };

  // Función para manejar el cambio del filtro de stock disponible
  const handleStockChange = (event) => {
    setConStock(event.target.checked);
    filtrarServicios(); // Puedes llamar a filtrarServicios aquí si quieres aplicar el filtro inmediatamente
  };

  // Funcion para limpiar filtros
  const limpiarFiltros = () => {
    setvarietalFiltro('');
    setTipoFiltro('');
    setBodegaFiltro('');
    setServiciosFiltrados(servicios);
  };

  return (
    <div>
      <Container className={classes.mainContentLeft}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Typography variant="h4" gutterBottom color>
              Explorar Vinos
            </Typography>
          </Grid>

          <Grid item sm={3}>
            <TextField
              id="filled-basic"
              label="Filled"
              variant="filled"
              className={classes.botonBuscar}
            />
            {/* <input
              type="search"
              placeholder="Buscar vinos..."
              className={classes.title}
              value={searchValue}
              onChange={handleSearchChange}
            /> */}
          </Grid>
          <Grid item sm={3}>
            <Button className={classes.buscarButton} onClick={filtrarServicios}>
              Buscar
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <DynamicSelect
              label="Varietal"
              value={varietalFiltro}
              onChange={(e) => setvarietalFiltro(e.target.value)}
              className={classes.formControl}
              options={[
                { value: 'Malbec', label: 'Malbec' },
                { value: 'Chardonnay', label: 'Chardonnay' },
                { value: 'Malbec Rose', label: 'Malbec Rose' },
                { value: 'Cabernet Sauvignon', label: 'Cabernet Sauvignon' },
                { value: 'Merlot', label: 'Merlot' },
                { value: 'Syrah', label: 'Syrah' },
                { value: 'Pinot Noir', label: 'Pinot Noir' },
                { value: 'Sauvignon Blanc', label: 'Sauvignon Blanc' },
                { value: 'Tempranillo', label: 'Tempranillo' },
                { value: 'Garnacha', label: 'Garnacha' },
                { value: 'Viognier', label: 'Viognier' },
              ]}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <DynamicSelect
              label="Tipo"
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className={classes.formControl}
              options={[
                { value: 'Semi-seco', label: 'Semi-seco' },
                { value: 'Dulce', label: 'Dulce' },
                { value: 'Seco', label: 'Seco' },
              ]}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <DynamicSelect
              label="Bodega"
              value={bodegaFiltro}
              onChange={(e) => setBodegaFiltro(e.target.value)}
              className={classes.formControl}
              options={[
                { value: 'Luigi Bosca', label: 'Luigi Bosca' },
                { value: 'Fond de Cave', label: 'Fond de Cave' },
                { value: 'Las Perdices', label: 'Las Perdices' },
              ]}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <DynamicSelect
              label="Maridaje"
              value={bodegaFiltro}
              onChange={(e) => setBodegaFiltro(e.target.value)}
              className={classes.formControl}
              options={[
                { value: 'Luigi Bosca', label: 'Luigi Bosca' },
                { value: 'Fond de Cave', label: 'Fond de Cave' },
                { value: 'Las Perdices', label: 'Las Perdices' },
              ]}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={conStock}
                  onChange={handleStockChange}
                  name="stockCheckbox"
                  sx={{
                    color: 'primary.main', // Usa el color principal del tema para el estado no marcado
                    '&.Mui-checked': {
                      color: 'primary.main', // Usa el color principal del tema para el estado marcado
                      '&:after': {
                        // Estilo para el checkmark en sí
                        content: '""',
                        position: 'absolute',
                        backgroundColor: '#7A0C1A', // Aquí estableces el color del checkmark
                        width: '16px',
                        height: '16px',
                        top: 'calc(50% - 8px)',
                        left: 'calc(50% - 8px)',
                      },
                    },
                  }}
                />
              }
              label="Stock Disponible"
              style={{
                margin: '8px 0',
                height: '56px', // Ajusta la altura para que coincida con el dropdown
                display: 'flex',
                alignItems: 'center', // Asegúrate de que el contenido esté centrado verticalmente
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Button className={classes.rubyButton} onClick={filtrarServicios}>
              Filtrar
            </Button>
          </Grid>

          <Grid item xs={11}>
            <Button
              className={classes.outlinedRubyButton}
              onClick={limpiarFiltros}
            >
              Limpiar Filtros
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {currentServices.map((servicio) => (
            <ServiceCard
              key={servicio.id}
              service={servicio}
              onClick={setSelectedService}
              onHire={handleHire}
            />
          ))}
        </Grid>

        <div className={classes.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </div>

        <ServiceDetails
          service={selectedService}
          resultados={serviciosFiltrados}
          onClose={() => setSelectedService(null)}
          onHire={handleHire}
        />
      </Container>
      <ContratacionForm
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        telefono={telefono}
        setTelefono={setTelefono}
        email={email}
        setEmail={setEmail}
        horario={horario}
        setHorario={setHorario}
        mensaje={mensaje}
        setMensaje={setMensaje}
        generateTimeOptions={generateTimeOptions}
        CheckTime={CheckTime}
        isFormComplete={isFormComplete}
        resetFormContratacion={resetFormContratacion}
      />
      <NotificationRed
        open={notificationRedOpen}
        message={notificationRedMessage}
        onClose={() => setNotificationRedOpen(false)}
      />
      <NotificationGreen
        open={notificationGreenOpen}
        message="Solicitud de contacto enviada"
        onClose={() => setNotificationGreenOpen(false)}
      />
    </div>
  );
}

export default ServiceExplorer;
