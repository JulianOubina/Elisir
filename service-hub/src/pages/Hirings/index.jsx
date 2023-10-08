import React, { useState } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Pagination,
  Box,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import HiringList from './HiringList';
import mockHirings from '../../data/mockHirings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabHover: {
    '&:hover': {
      color: '#ffffff',
    },
  },
}));

function Hirings() {
  const classes = useStyles();

  const [contrataciones, setContrataciones] = useState(mockHirings);
  const [currentTab, setCurrentTab] = useState('General');

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleEstadoChange = (id, nuevoEstado) => {
    const updatedContrataciones = contrataciones.map((contratacion) => {
      if (contratacion.id === id) {
        return { ...contratacion, estado: nuevoEstado };
      }
      return contratacion;
    });
    setContrataciones(updatedContrataciones);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  // Filtrar contrataciones basado en la pestaña actual

  const filteredContrataciones =
    currentTab === 'General'
      ? contrataciones
      : contrataciones.filter((c) => c.estado === currentTab);

  // Calcular el número total de páginas basado en las contrataciones filtradas
  const totalPages = Math.ceil(filteredContrataciones.length / itemsPerPage);

  return (
    <div>
      <Container className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Contrataciones
        </Typography>

        <Tabs
          variant="fullWidth"
          size="small"
          value={currentTab}
          onChange={handleChangeTab}
          centered
          className={classes.tabs}
        >
          <Tab label="General" value="General" className={classes.tabHover} />
          <Tab
            label="Solicitada"
            value="solicitada"
            className={classes.tabHover}
          />
          <Tab label="Aceptada" value="aceptada" className={classes.tabHover} />
          <Tab
            label="Finalizada"
            value="finalizada"
            className={classes.tabHover}
          />
        </Tabs>

        <HiringList
          contrataciones={filteredContrataciones.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )}
          handleEstadoChange={handleEstadoChange}
          classes={classes}
        />

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" marginTop="20px">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
          </Box>
        )}
      </Container>
    </div>
  );
}

export default Hirings;
