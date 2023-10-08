import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function HiringItem({ contratacion, handleEstadoChange }) {
  return (
    <ListItem key={contratacion.id} alignItems="flex-start">
      <ListItemText
        primary={contratacion.servicio}
        secondary={
          <>
            <Typography component="span" variant="body2" color="textPrimary">
              Usuario: {contratacion.usuario} <br />
              Teléfono de contacto: {contratacion.numeroTelefonico} <br />
              Franja Horaria: {contratacion.horarioContacto}
            </Typography>
            <br />
            {'Estado: '}
            <Select
              value={contratacion.estado}
              onChange={(e) =>
                handleEstadoChange(contratacion.id, e.target.value)
              }
            >
              <MenuItem value="solicitada">Solicitada</MenuItem>
              <MenuItem value="aceptada">Aceptada</MenuItem>
              <MenuItem value="finalizada">Finalizada</MenuItem>
            </Select>
          </>
        }
      />
    </ListItem>
  );
}

export default HiringItem;
