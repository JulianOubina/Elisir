import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import mockComments from '../../data/mockComments';
import NotificationGreen from '../../components/ui/NotificationGreen';

function ServiceCard({ service, onClick, onRemoveFromFavorites }) {
  // Calculate average rating for the service
  const serviceComments = mockComments.filter(
    (comment) => comment.serviceName === service.name
  );
  const averageRating =
    serviceComments.reduce((acc, comment) => acc + comment.rating, 0) /
    serviceComments.length;

  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleCommentClick = () => {
    setOpenCommentForm(true);
  };

  const handleCloseCommentForm = () => {
    setOpenCommentForm(false);
  };

  const handleSendComment = () => {
    // Here, you can handle the submission of the comment, e.g., save it to a database.
    setOpenCommentForm(false);
    setNotificationOpen(true);
  };

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mainComment, setMainComment] = useState('');

  const canSubmit = name && lastName && mainComment;

  const [isFavorite, setIsFavorite] = useState(true); // Estado local para rastrear si es favorito
  const userInfo = localStorage.getItem('userEmail');
  console.log(userInfo);

  // Función para manejar el cambio de estado de favoritos
  const handleAddToFavorites = () => {
    const newFavoriteStatus = !isFavorite; // Cambiar el estado de favorito
    const info = {
      name: service.name,
    };

    fetch('http://localhost:3030/favs/delete', {
      method: 'POST',
      credentials: 'include', // Necessary to include cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userInfo, vino: info }),
    }).catch((error) => {
      console.error('Error:', error);
    });

    setIsFavorite(newFavoriteStatus);
    onRemoveFromFavorites();
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">{service.name}</Typography>
          <Typography color="textSecondary">{service.cellar}</Typography>
          <Rating value={averageRating} readOnly precision={0.5} />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => onClick(service)}>
            Ver más
          </Button>
          <Button size="small" onClick={handleCommentClick}>
            Comentar
          </Button>
          <Button size="small" onClick={handleAddToFavorites}>
            {isFavorite ? <StarIcon color="secondary" /> : <StarBorderIcon />}
          </Button>
        </CardActions>

        <Dialog open={openCommentForm} onClose={handleCloseCommentForm}>
          <DialogTitle>Comentar</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nombre"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Apellido"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Typography>Rating:</Typography>
            <Rating name="comment-rating" />
            <TextField
              margin="dense"
              label="Comentario Principal"
              fullWidth
              value={mainComment}
              onChange={(e) => setMainComment(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Comentario Secundario"
              fullWidth
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCommentForm} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={handleSendComment}
              color="primary"
              disabled={!canSubmit}
            >
              Enviar
            </Button>
          </DialogActions>
        </Dialog>

        <NotificationGreen
          open={notificationOpen}
          message="Comentario enviado"
          onClose={() => setNotificationOpen(false)}
        />
      </Card>
    </Grid>
  );
}

export default ServiceCard;
