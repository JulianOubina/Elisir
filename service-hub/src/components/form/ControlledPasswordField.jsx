import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function ControlledPasswordField({ label, value, onChange, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [hasTyped, setHasTyped] = useState(false); // Nuevo estado para registrar si el usuario ha empezado a escribir

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (event) => {
    setHasTyped(true); // Cuando el usuario escribe, actualizamos el estado a true
    onChange(event);
  };

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  const isValid = regex.test(value);

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      label={label}
      value={value}
      onChange={handleOnChange}
      error={hasTyped && !isValid} // Solo mostramos el error si hasTyped es true y la contraseña no es válida
      helperText={
        hasTyped &&
        !isValid &&
        'La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula, un dígito numérico y un carácter especial (como !@#$%^&*).'
      }
      variant="outlined"
      fullWidth
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleTogglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ControlledPasswordField;
