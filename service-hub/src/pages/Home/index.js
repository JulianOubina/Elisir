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
import { useNavigate } from 'react-router-dom';
import useStyles from '../../styles/styles';
import mockServices from '../../data/mockServices';
import mockComments from '../../data/mockComments';
import ServiceDetails from '../ServiceExplorer/ServiceDetails';

import vino1Image from '../../assets/Logos/Vinos/VinoTinto.png';
import vino2Image from '../../assets/Logos/Vinos/VinoBlanco.png';
import vino3Image from '../../assets/Logos/Vinos/VinoRosado.png';

import ContratacionForm from '../ServiceExplorer/ContratacionForm';
import NotificationRed from '../../components/ui/NotificationRed';
import NotificationGreen from '../../components/ui/NotificationGreen';

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

  const serviceImages = [vino1Image, vino2Image, vino3Image];

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
      <Container className={classes.mainContentCenter}>
        <div className={classes.mainTitle}>
          <Typography
            variant="h5"
            paragraph
            style={{
              color: 'black',
              fontFamily: 'Merriweather, Georgia, serif',
              fontStyle: 'italic',
            }}
            align="left"
          >
            {' '}
            De lo esencial de la naturaleza, a la singularidad
            <br />
            de lo excepcional
          </Typography>
        </div>

        {/* Aquí se agregan las líneas que proporcionaste */}
        <Typography
          variant="h5"
          gutterBottom
          align="left"
          className={classes.sectionTitle}
        >
          Entérate de las tendencias de las industrias, las novedades y lo que
          se viene
        </Typography>
        <Typography variant="body1" paragraph align="left" color="white">
          Conoce el presente de la vitivinicultura argentina y entérate de todo
          lo que tienes que saber acerca de los vinos
        </Typography>

        <div className={classes.section}>
          <Grid container spacing={5} className={classes.cardContainer}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <Card className={classes.cardFuncionalidades}>
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
            Echa un vistazo a algunos de los vinos más populares
          </Typography>
          <Grid container spacing={3}>
            {mockServices.slice(0, 3).map((service, index) => (
              <Grid item xs={12} sm={4} key={service.id}>
                <Card
                  className={classes.card}
                  // onClick={() => setSelectedService(service)}
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
