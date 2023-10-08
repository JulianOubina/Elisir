import React, { useState } from 'react';
import {
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from 'react-router-dom';
import mockServices from '../../data/mockServices';
import mockComments from '../../data/mockComments';
import ServiceDetails from '../ServiceExplorer/ServiceDetails';

import service1Image from '../../assets/Logos/matematica.jpg';
import service2Image from '../../assets/Logos/fisica.jpg';
import service3Image from '../../assets/Logos/quimica.jpg';

import ContratacionForm from '../ServiceExplorer/ContratacionForm';
import NotificationRed from '../../components/ui/NotificationRed';
import NotificationGreen from '../../components/ui/NotificationGreen';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#C0A1AE', // Fondo oscuro
  },
  mainContent: {
    padding: theme.spacing(5),
    textAlign: 'center',
    backgroundColor: '#976278', // Fondo de las secciones
    color: 'white', // Color de los textos
    fontFamily: 'Roboto, sans-serif', // Fuente para contenido principal
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#370318', // Fondo del footer
    color: 'white', // Color del texto del footer
    fontFamily: 'Roboto, sans-serif', // Fuente para el footer
  },
  media: {
    height: 140,
  },
  card: {
    maxWidth: 345,
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      cursor: 'pointer',
    },
    backgroundColor: '#EAE0E4',
  },
  section: {
    margin: theme.spacing(2, 2),
    padding: theme.spacing(5, 0),
    borderBottom: '2px solid #e0e0e0',
  },
  mainTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#EAEAEA',
    marginBottom: theme.spacing(2),
    borderBottom: '5px solid #e0e0e0',
    display: 'inline-block',
  },
  subTitle: {
    fontSize: '2rem',
    fontStyle: 'italic',
    color: '#EAEAEA',
    marginTop: theme.spacing(1),
  },
  rubyColor: {
    color: '#9B111E', // Rojo rubí
  },
  rubyButton: {
    backgroundColor: '#9B111E', // Rojo rubí
    color: 'white',
    '&:hover': {
      backgroundColor: '#7A0C1A', // Un tono más oscuro de rojo rubí para el hover
    },
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [selectedService, setSelectedService] = useState(null);

  // Función para calcular el rating promedio de un servicio
  const getAverageRating = (serviceName) => {
    const commentsForService = mockComments.filter(
      (comment) => comment.serviceName === serviceName
    );
    if (commentsForService.length === 0) return 0; // Si no hay comentarios, retornar 0

    const totalRating = commentsForService.reduce(
      (acc, comment) => acc + comment.rating,
      0
    );
    return totalRating / commentsForService.length;
  };

  // Obtener los top 3 comentarios basados en el rating
  const topComments = [...mockComments]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const navigate = useNavigate();

  const serviceImages = [service1Image, service2Image, service3Image];

  // Estado para controlar el diálogo de contratación
  const [dialogOpen, setDialogOpen] = useState(false);

  // Estados para los campos del formulario de contratación
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [horario, setHorario] = useState({ inicio: '', fin: '' });
  const [mensaje, setMensaje] = useState('');

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

  // Función para resetear el formulario de contratación
  const resetFormContratacion = () => {
    setTelefono('');
    setEmail('');
    setHorario({ inicio: '', fin: '' });
    setMensaje('');
  };

  // Estados para controlar las notificaciones
  const [notificationRedOpen, setNotificationRedOpen] = useState(false);
  const [notificationRedMessage, setNotificationRedMessage] = useState('');
  const [notificationGreenOpen, setNotificationGreenOpen] = useState(false);

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

  // Función para verificar si todos los campos del formulario están completos
  const isFormComplete = () => {
    return telefono && email && horario.inicio && horario.fin && mensaje;
  };

  const features = [
    {
      title: 'Degustaciones',
      description:
        'Explora y reserva degustaciones en una amplia gama de vinos',
    },
    {
      title: 'Opiniones',
      description: 'Lee y comparte opiniones sobre diferentes vinos y bodegas',
    },
    {
      title: 'Conexiones',
      description: 'Conéctate con sommeliers y expertos en vinos',
    },
    {
      title: 'Recursos',
      description:
        'Accede a recursos y materiales para aprender sobre el mundo del vino',
    },
  ];

  return (
    <div className={classes.root}>
      <Container className={classes.mainContent}>
        <div className={classes.mainTitle}>
          <Typography variant="h5" paragraph style={{ color: '#EAEAEA' }}>
            Bienvenido a Elisir, tu puerta de entrada a un mundo de sabores y
            experiencias vinícolas
          </Typography>
          <Typography variant="h3" gutterBottom className={classes.subTitle}>
            Uno se Toma, el Otro se Saborea
          </Typography>
        </div>
        <div className={classes.section}>
          <Grid container spacing={5}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.section}>
          <Typography
            variant="h5"
            gutterBottom
            className={classes.sectionTitle}
          >
            Echa un vistazo a algunos de nuestros vinos más populares
          </Typography>
          <Grid container spacing={3}>
            {mockServices.slice(0, 3).map((service, index) => (
              <Grid item xs={12} sm={4} key={service.id}>
                <Card
                  className={classes.card}
                  onClick={() => setSelectedService(service)}
                >
                  <CardMedia
                    className={classes.media}
                    image={serviceImages[index]}
                    title={service.nombre}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {service.nombre}
                    </Typography>
                    <Rating
                      value={getAverageRating(service.nombre)}
                      readOnly
                      size="small"
                      precision={0.1}
                    />
                    <Typography variant="body2" component="span">
                      {getAverageRating(service.nombre).toFixed(1)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.section}>
          <Typography
            variant="h5"
            gutterBottom
            className={classes.sectionTitle}
          >
            Experiencias de usuarios
          </Typography>
          <Grid container spacing={3}>
            {topComments.map((comment) => (
              <Grid item xs={12} sm={4} key={comment.id}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {comment.user}
                    </Typography>
                    <Rating
                      value={comment.rating}
                      readOnly
                      size="small"
                      precision={0.1}
                    />
                    <Typography variant="body2" component="span">
                      {comment.rating.toFixed(1)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <Typography variant="h6" paragraph style={{ color: '#EAEAEA' }}>
          ¿Listo para explorar?
        </Typography>
        <Button
          variant="contained"
          className={classes.rubyButton}
          size="large"
          onClick={() => navigate('/explorar-servicios')}
        >
          ¡Empieza Ahora!
        </Button>
      </Container>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Elisir
        </Typography>
        <Typography variant="subtitle1" align="center" color="white">
          info@elisir.com
        </Typography>
      </footer>

      {/* Mostrar detalles del servicio seleccionado */}
      {selectedService && ( // Mostrar solo si hay un servicio seleccionado
        <ServiceDetails
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onHire={() => setDialogOpen(true)}
        />
      )}
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

export default LandingPage;
