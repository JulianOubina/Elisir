import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#976278', // Fondo oscuro
  },
  button: {
    margin: theme.spacing(1),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainContent: {
    padding: theme.spacing(5),
    textAlign: 'center',
  },
  footer: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
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
  rubyButton: {
    backgroundColor: '#9B111E', // Rojo rubí
    color: 'white',
    '&:hover': {
      backgroundColor: '#7A0C1A', // Un tono más oscuro de rojo rubí para el hover
    },
  },
}));

export default useStyles;
