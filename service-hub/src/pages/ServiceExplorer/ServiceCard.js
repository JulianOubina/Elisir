import React, { useState, useEffect } from 'react';
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

function ServiceCard({ service, onClick }) {
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
  const [brand, setBrand] = useState('-');

  const canSubmit = name && lastName && mainComment;

  const [isFavorite, setIsFavorite] = useState(false); // Estado local para rastrear si es favorito
  const [caracteristicas, setCaracteristicas] = useState({});

  // Función para manejar el cambio de estado de favoritos
  const handleAddToFavorites = () => {
    const newFavoriteStatus = !isFavorite; // Cambiar el estado de favorito
    setIsFavorite(newFavoriteStatus); // Actualizar el estado

    // Aquí puedes agregar lógica adicional para persistir la actualización de favoritos,
    // como una llamada a una API o actualizar el estado global de la aplicación.
  };
  // Fetch data from MercadoLibre API
  const MELI_API_URL =
    // eslint-disable-next-line prefer-template
    'https://api.mercadolibre.com/products/search?status=active&site_id=MLA&product_identifier=' +
    service.catalog_product_id;

  // Fetch data from MercadoLibre API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(MELI_API_URL);
        const data = await response.json();
        setCaracteristicas(data);

        if (data.results) {
          const brandAttribute = data.results[0].attributes.find(
            (attr) => attr.id === 'BRAND'
          );
          if (brandAttribute) {
            setBrand(brandAttribute.value_name);
          }
        }
      } catch (error) {
        console.error('Could not fetch data from MercadoLibre API', error);
      }
    };

    fetchData();
  }, [service]);

  if (!caracteristicas.results) {
    // Loading state, or return null, or a spinner etc.
    return <div> </div>;
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" marginBottom={1} marginTop={1}>
                {brand}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
              <Typography color="textSecondary" marginBottom={1}>
                {caracteristicas.results[0].attributes[0].value_name}
              </Typography>
              <Rating value={averageRating} readOnly precision={0.5} />
            </Grid>
            <Grid item xs={9} sm={9} md={9}>
              <img
                src={caracteristicas.results[0].pictures[0].url}
                style={{
                  width: '100%',
                  height: '40vh',
                  objectFit: 'contain',
                }}
                alt="Product"
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => onClick(caracteristicas)}
          >
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
