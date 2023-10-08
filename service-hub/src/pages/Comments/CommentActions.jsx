import React from 'react';
import { Button, Grid } from '@mui/material';

function CommentActions({ onPublish, onDelete }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onPublish}
        >
          Publicar
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onDelete}
        >
          Borrar
        </Button>
      </Grid>
    </Grid>
  );
}

export default CommentActions;
