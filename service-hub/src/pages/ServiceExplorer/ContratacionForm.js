import React from 'react';
import {
  Button,
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
} from '@mui/material';
import useStyles from '../../styles/styles';

function ContratacionForm({
  dialogOpen,
  setDialogOpen,
  telefono,
  setTelefono,
  email,
  setEmail,
  horario,
  setHorario,
  mensaje,
  setMensaje,
  generateTimeOptions,
  CheckTime,
  isFormComplete,
  resetFormContratacion,
}) {
  const classes = useStyles();

  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>Contratar Servicio</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography variant="h7" gutterBottom>
          Franja horaria de contacto
        </Typography>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Hora de inicio</InputLabel>
          <Select
            value={horario.inicio}
            onChange={(e) => setHorario({ ...horario, inicio: e.target.value })}
          >
            <MenuItem value="Seleccionar">Seleccionar</MenuItem>
            {generateTimeOptions().map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Hora de finalización</InputLabel>
          <Select
            value={horario.fin}
            onChange={(e) => setHorario({ ...horario, fin: e.target.value })}
          >
            <MenuItem value="Seleccionar">Seleccionar</MenuItem>
            {generateTimeOptions().map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Mensaje al proveedor"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setDialogOpen(false);
            resetFormContratacion();
          }}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={CheckTime}
          color="primary"
          disabled={!isFormComplete()} // Deshabilita el botón si el formulario no está completo
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContratacionForm;
