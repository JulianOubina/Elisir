import React from 'react';
import {
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Rating,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from '@mui/icons-material/Category';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimerIcon from '@mui/icons-material/Timer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ClassIcon from '@mui/icons-material/Class';
import useStyles from '../../styles/styles';
import mockComments from '../../data/mockComments';

function ServiceDetails({ service, onClose, onHire }) {
  const classes = useStyles();

  // Filter comments for the selected service
  const serviceComments = mockComments.filter(
    (comment) => comment.serviceName === service?.nombre
  );

  return (
    <Dialog open={!!service} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{service?.nombre}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Proveedor" secondary={service?.proveedor} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categoría" secondary={service?.categoria} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Tipo" secondary={service?.tipo} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Frecuencia"
              secondary={service?.frecuencia}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText primary="Duración" secondary={service?.duracion} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Costo" secondary={service?.costo} />
          </ListItem>
        </List>

        <Divider className={classes.commentCard} />

        {/* Display user comments and their ratings */}
        {serviceComments.map((comment) => (
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
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
        <Button onClick={onHire} color="secondary">
          Contratar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ServiceDetails;
