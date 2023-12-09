/* eslint-disable react/no-array-index-key */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material';
import ResponsiveAppBar from './components/ui/NavBar';
import './assets/stylesheets/styles.css';
import { ROUTE_LOGIN, routesConfig } from './config/routes';
import LoginPage from './pages/Login/index';

const theme = createTheme();

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false); // Aquí puedes verificar si el usuario está autenticado

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    fetch('http://localhost:3030/user/logout', {
      method: 'GET',
      credentials: 'include',
    });
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <CssBaseline />
            <ResponsiveAppBar
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              position="fixed"
            />

            <Container style={{ paddingTop: '64px' }}>
              <Routes>
                {routesConfig.map((route, index) => {
                  if (route.path === ROUTE_LOGIN) {
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={<LoginPage onLogin={handleLogin} />}
                      />
                    );
                  }
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={route.element}
                    />
                  );
                })}
              </Routes>
            </Container>
          </div>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
