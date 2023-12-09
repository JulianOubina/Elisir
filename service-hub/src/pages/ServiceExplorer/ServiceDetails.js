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
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import PlaceIcon from '@mui/icons-material/Place';
import PublicIcon from '@mui/icons-material/Public';
import WineBarIcon from '@mui/icons-material/WineBar';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LiquorIcon from '@mui/icons-material/Liquor';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ClassIcon from '@mui/icons-material/Class';
import useStyles from '../../styles/styles';

function ServiceDetails({ service, resultados, onClose }) {
  const classes = useStyles();
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
  const [ciudad, setCiudad] = useState('-');
  const [barrio, setBarrio] = useState('-');
  const [vendedor, setVendedor] = useState('-');
  const [link, setLink] = useState('-');
  const [stock, setStock] = useState('Sin Stock');

  useEffect(() => {
    if (service) {
      if (service.results[0].attributes) {
        const nombreAttribute = service.results[0].attributes.find(
          (attr) => attr.id === 'BRAND'
        );
        if (nombreAttribute) {
          setNombre(nombreAttribute.value_name);
        }

        const bodegaAttribute = service.results[0].attributes.find(
          (attr) => attr.id === 'CELLAR'
        );
        if (bodegaAttribute) {
          setBodega(bodegaAttribute.value_name);
        }

        const varietalAttribute = service.results[0].attributes.find(
          (attr) => attr.id === 'VARIETAL'
        );
        if (varietalAttribute) {
          setVarietal(varietalAttribute.value_name);
        }

        const tipoAttribute = service.results[0].attributes.find(
          (attr) => attr.id === 'WINE_VARIETY'
        );
        if (tipoAttribute) {
          setTipo(tipoAttribute.value_name);
        }

        const maridajeAttribute = service.results[0].attributes.find(
          (attr) => attr.id === 'RECOMMENDED_USES'
        );
        if (maridajeAttribute) {
          setMaridaje(maridajeAttribute.value_name);
        }

        const regionAttribute = service.results[0].attributes.find(
          (attr) => attr.id === 'REGIONS'
        );
        if (regionAttribute) {
          setRegion(regionAttribute.value_name);
        }

        const precioAttribute = resultados.find(
          (result) => result.catalog_product_id === service.keywords
        );
        setCiudad(precioAttribute.address.state_name);
        setBarrio(precioAttribute.address.city_name);
        setVendedor(precioAttribute.seller.nickname);
        setLink(precioAttribute.permalink);
        if (precioAttribute.available_quantity > 0) {
          setStock('Disponible');
        }
        if (precioAttribute && precioAttribute.original_price) {
          // eslint-disable-next-line prefer-template
          const precioAux = '$ ' + precioAttribute.original_price;
          setPrecio(precioAux);
        } else {
          // eslint-disable-next-line prefer-template
          const precioAux = '$ ' + precioAttribute.price;
          setPrecio(precioAux);
        }
      }
    }
  }, [service]); // This will only run when `service` changes.

  return (
    <Dialog open={!!service} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{nombre}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText
              primary="Vendedor"
              secondary={
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {vendedor}
                </a>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Stock" secondary={stock} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText
              primary="Ubicacion"
              secondary={`${ciudad} - ${barrio}`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <WineBarIcon />
            </ListItemIcon>
            <ListItemText primary="Bodega" secondary={bodega} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <LiquorIcon />
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
              <DinnerDiningIcon />
            </ListItemIcon>
            <ListItemText primary="Maridaje" secondary={maridaje} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <PublicIcon />
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
