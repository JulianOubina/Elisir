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
import mockComments from '../../data/mockComments';
import NotificationGreen from '../../components/ui/NotificationGreen';

function ServiceCard({ service, onClick, onHire }) {
  // Calculate average rating for the service
  const serviceComments = mockComments.filter(
    (comment) => comment.serviceName === service.nombre
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

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">{service.nombre}</Typography>
          <Typography color="textSecondary">{service.proveedor}</Typography>
          <Rating value={averageRating} readOnly precision={0.5} />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => onClick(service)}>
            Ver más
          </Button>
          <Button size="small" color="secondary" onClick={onHire}>
            Contratar
          </Button>
          <Button size="small" onClick={handleCommentClick}>
            Comentar
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
