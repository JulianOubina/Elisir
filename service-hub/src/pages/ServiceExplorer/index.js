import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Grid, Pagination } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import DynamicSelect from '../../components/form/DynamicSelect';
import ServiceCard from './ServiceCard';
import ServiceDetails from './ServiceDetails';
import useStyles from '../../styles/styles';
import NotificationRed from '../../components/ui/NotificationRed';
import NotificationGreen from '../../components/ui/NotificationGreen';
import ContratacionForm from './ContratacionForm';

function ServiceExplorer() {
  const classes = useStyles();
  // const navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);

  const servicesPerPage = 9;
  const [currentServices, setCurrentServices] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchFlag, setFetchFlag] = useState(false);

  // Estados lista de servicios y filtrada
  const [servicios, setServicios] = useState([]);
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [todo, setTodo] = useState({});
  const [url, setUrl] = useState(
    'https://api.mercadolibre.com/sites/MLA/search?category=MLA1404&units_per_pack=[1-1]&SALE_FORMAT=1359391&UNIT_VOLUME=(*-1L)'
  );

  // Fetch data from MercadoLibre API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setServicios(data.results);
        setServiciosFiltrados(data.results); // Assuming you want to initially show all results

        setTotalPages(Math.ceil(serviciosFiltrados.length / servicesPerPage));
        setCurrentServices(
          serviciosFiltrados.slice(
            (currentPage - 1) * servicesPerPage,
            currentPage * servicesPerPage
          )
        );

        if (!todo.available_filters) {
          setTodo(data);
        }
      } catch (error) {
        console.error('Could not fetch data from MercadoLibre API', error);
      }
    };

    fetchData();

    fetch('http://localhost:3030/opinions/allComments', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((recibedAllComments) => {
        setAllComments(recibedAllComments);
      });
  }, [url, fetchFlag]);

  useEffect(() => {
    setTotalPages(Math.ceil(serviciosFiltrados.length / servicesPerPage));
    setCurrentServices(
      serviciosFiltrados.slice(
        (currentPage - 1) * servicesPerPage,
        currentPage * servicesPerPage
      )
    );
  }, [serviciosFiltrados, currentPage, fetchFlag]);

  // Estados para los filtros
  const [varietalFiltro, setvarietalFiltro] = useState('');
  const [varietalDisplay, setvarietalDisplay] = useState('');

  const [tipoFiltro, setTipoFiltro] = useState('');
  const [tipoDisplay, settipoDisplay] = useState('');

  const [bodegaFiltro, setBodegaFiltro] = useState('');
  const [bodegaDisplay, setBodegaDisplay] = useState('');

  const [ubicacionFiltro, setUbicacionFiltro] = useState('');
  const [ubicacionDisplay, setUbicacionDisplay] = useState('');

  useEffect(() => {
    let newUrl =
      'https://api.mercadolibre.com/sites/MLA/search?category=MLA1404&units_per_pack=[1-1]&SALE_FORMAT=1359391&UNIT_VOLUME=(*-1L)';
    newUrl += varietalFiltro + tipoFiltro + bodegaFiltro + ubicacionFiltro;
    setUrl(newUrl);
  }, [varietalFiltro, tipoFiltro, bodegaFiltro, ubicacionFiltro]);

  // Estados para los campos del formulario de contratación
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [horario, setHorario] = useState({ inicio: '', fin: '' });
  const [mensaje, setMensaje] = useState('');

  const [selectedService, setSelectedService] = useState(null);

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

  // Funcion para limpiar filtros
  const limpiarFiltros = () => {
    setvarietalFiltro('');
    setTipoFiltro('');
    setBodegaFiltro('');
    setUbicacionFiltro('');
    setUbicacionDisplay('');
    setvarietalDisplay('');
    settipoDisplay('');
    setBodegaDisplay('');
    setCurrentPage(1);
    setServiciosFiltrados(servicios);
  };

  const changeFetchFlag = () => {
    setTimeout(() => {
      setFetchFlag((prev) => !prev);
    }, 1000);
  };

  if (!todo.available_filters) {
    // Loading state, or return null, or a spinner etc.
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container className={classes.mainContentLeft}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Typography variant="h4" gutterBottom color>
              Explorar Vinos
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <DynamicSelect
              label="Varietal"
              value={varietalDisplay}
              onChange={(e) => {
                setvarietalDisplay(e.target.value);
                setvarietalFiltro(`&VARIETAL=${e.target.value}`);
                setCurrentPage(1);
              }}
              className={classes.formControl}
              options={
                todo.available_filters
                  .find((filtro) => filtro.id === 'VARIETAL')
                  ?.values.map((option) => ({
                    value: option.id,
                    label: option.name,
                  })) || []
              }
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <DynamicSelect
              label="Tipo"
              value={tipoDisplay}
              onChange={(e) => {
                setTipoFiltro(`&WINE_VARIETY=${e.target.value}`);
                settipoDisplay(e.target.value);
                setCurrentPage(1);
              }}
              className={classes.formControl}
              options={
                todo.available_filters
                  .find((filtro) => filtro.id === 'WINE_VARIETY')
                  ?.values.map((option) => ({
                    value: option.id,
                    label: option.name,
                  })) || []
              }
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <DynamicSelect
              label="Bodega"
              value={bodegaDisplay}
              onChange={(e) => {
                setBodegaFiltro(`&CELLAR=${e.target.value}`);
                setBodegaDisplay(e.target.value);
                setCurrentPage(1);
              }}
              className={classes.formControl}
              options={
                todo.available_filters
                  .find((filtro) => filtro.id === 'CELLAR')
                  ?.values.map((option) => ({
                    value: option.id,
                    label: option.name,
                  })) || []
              }
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <DynamicSelect
              label="Ubicación"
              value={ubicacionDisplay}
              onChange={(e) => {
                setUbicacionFiltro(`&state=${e.target.value}`);
                setUbicacionDisplay(e.target.value);
                setCurrentPage(1);
              }}
              className={classes.formControl}
              options={
                todo.available_filters
                  .find((filtro) => filtro.id === 'state')
                  ?.values.map((option) => ({
                    value: option.id,
                    label: option.name,
                  })) || []
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Button className={classes.rubyButton} onClick={null}>
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
          {currentServices.length > 0 ? (
            currentServices.map(
              (servicio) =>
                servicio.catalog_product_id && (
                  <ServiceCard
                    key={servicio.id}
                    service={servicio}
                    onClick={setSelectedService}
                    onHire={handleHire}
                    allComments={allComments}
                    changeFetchFlag={changeFetchFlag}
                  />
                )
            )
          ) : (
            <Typography variant="subtitle1" style={{ margin: '20px' }}>
              No se han encontrado resultados.
            </Typography>
          )}
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
          comments={allComments}
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
