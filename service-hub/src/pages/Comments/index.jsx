import React, { useState } from 'react';
import { Container, Typography, List, ListItem, Box } from '@mui/material';
import NotificationGreen from '../../components/ui/NotificationGreen';
import CommentCard from './CommentCard';
import mockComments from '../../data/mockComments';

function Comments() {
  const [comments, setComments] = useState(mockComments);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handlePublish = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
    setSnackbarMessage('Comentario publicado');
    setOpenSnackbar(true);
    // Despues hay que agregar la logica de publicar el comentario, ahora solo desaparce de la pag (leido)
  };

  const handleDelete = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
    setSnackbarMessage('Comentario borrado');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Comentarios
        </Typography>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} disablePadding>
              <CommentCard
                comment={comment}
                onPublish={handlePublish}
                onDelete={handleDelete}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <NotificationGreen
        open={openSnackbar}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
}

export default Comments;
