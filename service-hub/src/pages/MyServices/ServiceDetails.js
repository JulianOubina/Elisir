import React, { useState, useEffect } from 'react';
import {
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import WineBarIcon from '@mui/icons-material/WineBar';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LiquorIcon from '@mui/icons-material/Liquor';
import ClassIcon from '@mui/icons-material/Class';
import useStyles from '../../styles/styles';

function ServiceDetails({ service, onClose }) {
  const classes = useStyles();

  const [nombre, setNombre] = useState('');
  const [bodega, setBodega] = useState('-');
  const [varietal, setVarietal] = useState('-');
  const [tipo, setTipo] = useState('-');
  const [maridaje, setMaridaje] = useState('-');
  const [region, setRegion] = useState('-');

  useEffect(() => {
    if (service) {
      setNombre(service.name);
      setBodega(service.cellar);
      setVarietal(service.varietel);
      setTipo(service.type);
      setMaridaje(service.food);
      setRegion(service.zone);
    }
  }, [service]); // This will only run when `service` changes.

  return (
    <Dialog open={!!service} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{nombre}</DialogTitle>
      <DialogContent>
        <List>
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
        </List>

        <Divider className={classes.commentCard} />
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
