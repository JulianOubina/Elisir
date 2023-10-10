import makeStyles from '@mui/styles/makeStyles';
import fondoLanding from '../assets/Logos/fondoLanding.jpg';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    backgroundColor: 'white',
    color: 'white',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
  commentCard: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    backgroundColor: '#C0A1AE', // Fondo oscuro
    color: 'white', // Color de los textos
  },
  mainContentCenter: {
    padding: theme.spacing(5),
    textAlign: 'center',
    backgroundColor: '#976278', // Fondo de las secciones
    color: 'white', // Color de los textos
    fontFamily: 'Merriweather, Georgia, serif', // Fuente para contenido principal
  },
  mainContentLeft: {
    padding: theme.spacing(5),
    textAlign: 'left',
    backgroundColor: '#976278', // Fondo de las secciones
    color: 'white', // Color de los textos
    fontFamily: 'Merriweather, Georgia, serif', // Fuente para contenido principal
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#370318', // Fondo del footer
    color: 'white', // Color del texto del footer
    fontFamily: 'Merriweather, Georgia, serif', // Fuente para el footer
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
  cardFuncionalidades: {
    minHeight: 130,
    maxWidth: 345,
    marginBottom: '20px',
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
    fontFamily: 'Merriweather, Georgia, serif',
    marginTop: theme.spacing(5),
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#EAEAEA',
    borderRadius: 6.11111,
    marginBottom: theme.spacing(2),
    display: 'inline-block',
    backgroundImage: `url(${fondoLanding})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      minHeight: 250,
      minWidth: 300,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 350,
      minWidth: 600,
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 450,
      minWidth: 800,
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: 500,
      minWidth: 1000,
    },
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
  outlinedRubyButton: {
    border: 'none',
    color: 'white',
    '&:hover': {
      backgroundColor: '#7A0C1A',
      border: 'none', // Un tono más oscuro de rojo rubí para el hover
    },
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}));

export default useStyles;
