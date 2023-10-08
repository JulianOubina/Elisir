import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

function HiringList({ contrataciones, handleEstadoChange, classes }) {
  return (
    <Grid container spacing={3}>
      {contrataciones.map((contratacion) => (
        <Grid item xs={12} sm={6} md={4} key={contratacion.id}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">{contratacion.servicio}</Typography>
              <Typography color="textSecondary">
                {contratacion.usuario}
              </Typography>
              <Typography color="textSecondary">
                {contratacion.numeroTelefonico}
              </Typography>
              <Typography color="textSecondary">
                {contratacion.horarioContacto}
              </Typography>
            </CardContent>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              style={{ marginTop: '10px' }}
            >
              <InputLabel id={`select-label-${contratacion.id}`}>
                Estado
              </InputLabel>
              <Select
                labelId={`select-label-${contratacion.id}`}
                value={contratacion.estado}
                onChange={(event) =>
                  handleEstadoChange(contratacion.id, event.target.value)
                }
                label="Estado"
              >
                <MenuItem value="solicitada">Solicitada</MenuItem>
                <MenuItem value="aceptada">Aceptada</MenuItem>
                <MenuItem value="finalizada">Finalizada</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default HiringList;
