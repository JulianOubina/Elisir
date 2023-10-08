import React from 'react';
import { Snackbar } from '@mui/material';

function NotificationRed({ open, message, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      ContentProps={{
        style: { backgroundColor: 'red', color: 'white' },
      }}
    />
  );
}
export default NotificationRed;
