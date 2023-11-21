import React, { useState, useEffect } from 'react';
import {
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  // Card,
  // CardContent,
  DialogTitle,
  DialogContent,
  DialogActions,
  // Typography,
  Button,
  // Rating,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LiquorIcon from '@mui/icons-material/Liquor';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ClassIcon from '@mui/icons-material/Class';
import useStyles from '../../styles/styles';

function ServiceDetails({ service, resultados, onClose }) {
  const classes = useStyles();
  const [detalles, setDetalles] = useState([]);
  // Filter comments for the selected service
  /*   const serviceComments = mockComments.filter(
    (comment) => comment.serviceName === service?.nombre
    ); */

  const [nombre, setNombre] = useState('');
  const [bodega, setBodega] = useState('-');
  const [varietal, setVarietal] = useState('-');
  const [tipo, setTipo] = useState('-');
  const [maridaje, setMaridaje] = useState('-');
  const [region, setRegion] = useState('-');
  const [precio, setPrecio] = useState('-');

  useEffect(() => {
    if (service) {
      setDetalles(service.results[0].attributes);
      if (detalles) {
        const nombreAttribute = detalles.find((attr) => attr.id === 'BRAND');
        if (nombreAttribute) {
          setNombre(nombreAttribute.value_name);
        }

        const bodegaAttribute = detalles.find((attr) => attr.id === 'CELLAR');
        if (bodegaAttribute) {
          setBodega(bodegaAttribute.value_name);
        }

        const varietalAttribute = detalles.find(
          (attr) => attr.id === 'VARIETAL'
        );
        if (varietalAttribute) {
          setVarietal(varietalAttribute.value_name);
        }

        const tipoAttribute = detalles.find(
          (attr) => attr.id === 'WINE_VARIETY'
        );
        if (tipoAttribute) {
          setTipo(tipoAttribute.value_name);
        }

        const maridajeAttribute = detalles.find(
          (attr) => attr.id === 'RECOMMENDED_USES'
        );
        if (maridajeAttribute) {
          setMaridaje(maridajeAttribute.value_name);
        }

        const regionAttribute = detalles.find((attr) => attr.id === 'REGIONS');
        if (regionAttribute) {
          setRegion(regionAttribute.value_name);
        }

        const precioAttribute = resultados.find(
          (result) => result.catalog_product_id === service.keywords
        );
        if (precioAttribute && precioAttribute.original_price) {
          setPrecio(precioAttribute.original_price);
        } else {
          setPrecio(precioAttribute.price);
        }
      }
    }
  }, [service, detalles]); // This will only run when `service` changes.

  return (
    <Dialog open={!!service} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{nombre}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Bodega" secondary={bodega} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Varietal" secondary={varietal} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Tipo" secondary={tipo} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText primary="Maridaje" secondary={maridaje} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <LiquorIcon />
            </ListItemIcon>
            <ListItemText primary="Region" secondary={region} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Precio Sugerido" secondary={precio} />
          </ListItem>
        </List>

        <Divider className={classes.commentCard} />

        {/* Display user comments and their ratings */}
        {/*         {serviceComments.map((comment) => (
          <Card key={comment.id} className={classes.commentCard}>
            <CardContent>
              <Typography variant="h6">{comment.user}</Typography>
              <Rating value={comment.rating} readOnly />
              <Typography variant="body1">{comment.comment}</Typography>
              <Typography variant="body2">
                {comment.secondaryComment}
              </Typography>
            </CardContent>
          </Card>
        ))} */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServiceDetails;
