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
import NotificationGreen from '../../components/ui/NotificationGreen';

function ServiceCard({ service, onClick, allComments, changeFetchFlag }) {
  const [serviceComments, setServiceComments] = useState([]);
  const [averageRating, setAverageRating] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState({});
  const [fetchFlag, setFetchFlag] = useState(false);

  useEffect(() => {
    setServiceComments(
      allComments.filter(
        (comment) => comment.vino === service.attributes[0].value_name
      )
    );
    setAverageRating(
      serviceComments.reduce((acc, comment) => acc + comment.estrellas, 0) /
        serviceComments.length
    );
  }, [caracteristicas]);

  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [userInfo, setUserInfo] = useState();
  const handleCommentClick = () => {
    setOpenCommentForm(true);
  };

  const handleCloseCommentForm = () => {
    setOpenCommentForm(false);
  };

  const [name, setName] = useState('');
  const [mainComment, setMainComment] = useState('');
  const [secondComment, setSecondComment] = useState('');
  const [brand, setBrand] = useState('-');
  const [commentRating, setRating] = useState(5); // [1, 5]

  const handleSendComment = () => {
    const info = {
      nombre: name,
      vino: brand,
      estrellas: commentRating,
      titulo: mainComment,
      texto: secondComment,
    };

    fetch('http://localhost:3030/opinions', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });

    setOpenCommentForm(false);
    setNotificationOpen(true);
    changeFetchFlag();
    setFetchFlag((prev) => !prev);
  };

  const canSubmit = name && mainComment;

  const [isFavorite, setIsFavorite] = useState(false); // Estado local para rastrear si es favorito
  const [nombre, setNombre] = useState('');
  const [bodega, setBodega] = useState('-');
  const [varietal, setVarietal] = useState('-');
  const [tipo, setTipo] = useState('-');
  const [maridaje, setMaridaje] = useState('-');
  const [region, setRegion] = useState('-');

  // Función para manejar el cambio de estado de favoritos
  const handleAddToFavorites = () => {
    const newFavoriteStatus = !isFavorite;
    const info = {
      name: nombre,
      cellar: bodega,
      varietel: varietal,
      type: tipo,
      food: maridaje,
      zone: region,
    };

    if (isFavorite) {
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
      return;
    }

    fetch('http://localhost:3030/favs', {
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
  }, [service, fetchFlag]);

  useEffect(() => {
    setUserInfo(localStorage.getItem('userEmail'));
    if (caracteristicas.results) {
      if (caracteristicas.results[0].attributes) {
        const nombreAttribute = caracteristicas.results[0].attributes.find(
          (attr) => attr.id === 'BRAND'
        );
        if (nombreAttribute) {
          setNombre(nombreAttribute.value_name);
        }

        const bodegaAttribute = caracteristicas.results[0].attributes.find(
          (attr) => attr.id === 'CELLAR'
        );
        if (bodegaAttribute) {
          setBodega(bodegaAttribute.value_name);
        }

        const varietalAttribute = caracteristicas.results[0].attributes.find(
          (attr) => attr.id === 'VARIETAL'
        );
        if (varietalAttribute) {
          setVarietal(varietalAttribute.value_name);
        }

        const tipoAttribute = caracteristicas.results[0].attributes.find(
          (attr) => attr.id === 'WINE_VARIETY'
        );
        if (tipoAttribute) {
          setTipo(tipoAttribute.value_name);
        }

        const maridajeAttribute = caracteristicas.results[0].attributes.find(
          (attr) => attr.id === 'RECOMMENDED_USES'
        );
        if (maridajeAttribute) {
          setMaridaje(maridajeAttribute.value_name);
        }

        const regionAttribute = caracteristicas.results[0].attributes.find(
          (attr) => attr.id === 'REGIONS'
        );
        if (regionAttribute) {
          setRegion(regionAttribute.value_name);
        }
      }
    }
  }, [caracteristicas]);

  if (!caracteristicas.results || !caracteristicas.results[0]) {
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
          {userInfo !== 'undefined' && (
            <Button size="small" onClick={handleAddToFavorites}>
              {isFavorite ? <StarIcon color="secondary" /> : <StarBorderIcon />}
            </Button>
          )}
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
            <Typography>Rating:</Typography>
            <Rating
              name="comment-rating"
              value={commentRating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
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
              value={secondComment}
              onChange={(e) => setSecondComment(e.target.value)}
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
