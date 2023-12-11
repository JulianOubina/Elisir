import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%', // Asegúrate de que los controles de formulario usen todo el ancho disponible
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SignUpPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [nombre, setname] = useState('');
  const [genero, setGender] = useState('');
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNac, setBirthdate] = useState('');
  const [bodegaFav, setFavoriteWinery] = useState('');
  const [varietal, setVarietal] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [recomendaciones, setRecomendaciones] = useState('');

  const handleVarietalChange = (event) => {
    setVarietal(event.target.value);
  };

  const handleExperienciaChange = (event) => {
    setExperiencia(Number(event.target.value));
  };

  const handleRecomendacionesChange = (event) => {
    setRecomendaciones(event.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    const userData = {
      nombre,
      genero,
      username,
      password,
      fechaNac,
      bodegaFav,
      varietal,
      experiencia,
      recomendaciones,
    };

    // Por ejemplo, usando fetch para una solicitud POST:
    fetch('http://localhost:3030/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
    navigate('/login');
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Registro
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.textField}
            label="Nombre Completo"
            variant="outlined"
            value={nombre}
            onChange={(e) => setname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.textField}
            label="Genero"
            variant="outlined"
            value={genero}
            onChange={(e) => setGender(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.textField}
            label="Correo electrónico"
            variant="outlined"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.textField}
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            label="Fecha de nacimiento"
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={fechaNac}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            label="Bodega Favorita"
            variant="outlined"
            value={bodegaFav}
            onChange={(e) => setFavoriteWinery(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="varietal-label">Varietal</InputLabel>
                <Select
                  labelId="varietal-label"
                  id="varietal"
                  value={varietal}
                  onChange={handleVarietalChange}
                  label="Varietal"
                >
                  <MenuItem value="Malbec">Malbec</MenuItem>
                  <MenuItem value="Cabernet Sauvignon">
                    Cabernet Sauvignon
                  </MenuItem>
                  <MenuItem value="Chardonnay">Chardonnay</MenuItem>
                  <MenuItem value="Cabernet Franc">Cabernet Franc</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="experiencia-label">Experiencia</InputLabel>
                <Select
                  labelId="experiencia-label"
                  id="experiencia"
                  value={experiencia}
                  onChange={handleExperienciaChange}
                  label="Experiencia"
                >
                  {[...Array(10).keys()].map((number) => (
                    <MenuItem key={number + 1} value={number + 1}>
                      {number + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="recomendaciones-label">
                  Quiere recibir Recomendaciones?
                </InputLabel>
                <Select
                  labelId="recomendaciones-label"
                  id="recomendaciones"
                  value={recomendaciones}
                  onChange={handleRecomendacionesChange}
                  label="Quiere recibir Recomendaciones?"
                >
                  <MenuItem value="Si">Sí</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Registrarse
      </Button>
    </Container>
  );
}

export default SignUpPage;
