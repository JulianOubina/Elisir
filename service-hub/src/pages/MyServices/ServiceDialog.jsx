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
    varietal: '',
    tipo: '',
    volumen: '',
    bodega: '',
    costo: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (service) {
      setFormData({
        nombre: service.nombre,
        varietal: service.varietal,
        tipo: service.tipo,
        volumen: service.volumen,
        bodega: service.bodega,
        costo: service.costo,
      });
    } else {
      setFormData({
        nombre: '',
        varietal: '',
        tipo: '',
        volumen: '',
        bodega: '',
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
        {service ? 'Modificar Servicio' : 'Agregar Vino'}
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
          <InputLabel>Varietal</InputLabel>
          <Select
            name="varietal"
            value={formData.varietal}
            onChange={handleInputChange}
          >
            <MenuItem value="Malbec">Malbec</MenuItem>
            <MenuItem value="Chardonnay">Chardonnay</MenuItem>
            <MenuItem value="Malbec Rose">Malbec Rose</MenuItem>
            <MenuItem value="Cabernet Sauvignon">Cabernet Sauvignon</MenuItem>
            <MenuItem value="Merlot">Merlot</MenuItem>
            <MenuItem value="Syrah">Syrah</MenuItem>
            <MenuItem value="Pinot Noir">Pinot Noir</MenuItem>
            <MenuItem value="Sauvignon Blanc">Sauvignon Blanc</MenuItem>
            <MenuItem value="Tempranillo">Tempranillo</MenuItem>
            <MenuItem value="Garnacha">Garnacha</MenuItem>
            <MenuItem value="Viognier">Viognier</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Tipo</InputLabel>
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
          label="Volumen (ml)"
          name="volumen"
          value={formData.volumen}
          onChange={handleInputChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel>Bodega</InputLabel>
          <Select
            name="bodega"
            value={formData.bodega}
            onChange={handleInputChange}
          >
            <MenuItem value="Luigi Bosca">Luigi Bosca</MenuItem>
            <MenuItem value="Fond de Cave">Fond de Cave</MenuItem>
            <MenuItem value="Las Perdices">Las Perdices</MenuItem>
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
          disabled={formData.volumen < 1 || formData.costo < 0}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServiceDialog;
