import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ServiceCard({ service, onEdit, onDelete, classes }) {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">{service.nombre}</Typography>
        <Typography variant="body2">Duración: {service.duracion}</Typography>
        <Typography variant="body2">Costo: ${service.costo}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onEdit(service)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(service.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ServiceCard;
