import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from '@mui/material';

function ServiceDialog({ open, onClose, service, onSave, classes }) {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    tipo: '',
    duracion: '',
    frecuencia: '',
    costo: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (service) {
      setFormData({
        nombre: service.nombre,
        categoria: service.categoria,
        tipo: service.tipo,
        duracion: service.duracion,
        frecuencia: service.frecuencia,
        costo: service.costo,
      });
    } else {
      setFormData({
        nombre: '',
        categoria: '',
        tipo: '',
        duracion: '',
        frecuencia: '',
        costo: '',
      });
    }
  }, [service]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = () => {
    if (Object.values(formData).some((value) => !value)) {
      setErrorMessage('Por favor, completa todos los campos del formulario.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {service ? 'Modificar Servicio' : 'Agregar Servicio'}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel>Categoría</InputLabel>
          <Select
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
          >
            <MenuItem value="tutorias">Tutorías escolares</MenuItem>
            <MenuItem value="idioma">Clases de idioma</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Tipo de clase</InputLabel>
          <Select
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
          >
            <MenuItem value="individual">Individual</MenuItem>
            <MenuItem value="grupal">Grupal</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Duración (Horas Totales)"
          name="duracion"
          value={formData.duracion}
          onChange={handleInputChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel>Frecuencia</InputLabel>
          <Select
            name="frecuencia"
            value={formData.frecuencia}
            onChange={handleInputChange}
          >
            <MenuItem value="única">Única</MenuItem>
            <MenuItem value="semanal">Semanal</MenuItem>
            <MenuItem value="mensual">Mensual</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Costo"
          name="costo"
          value={formData.costo}
          onChange={handleInputChange}
        />
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={handleSaveClick}
          color="primary"
          disabled={formData.duracion < 1 || formData.costo < 0}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServiceDialog;
