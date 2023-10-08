import React from 'react';
import { Snackbar } from '@mui/material';

function NotificationGreen({ open, message, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      ContentProps={{
        style: { backgroundColor: 'green', color: 'white' },
      }}
    />
  );
}
export default NotificationGreen;
