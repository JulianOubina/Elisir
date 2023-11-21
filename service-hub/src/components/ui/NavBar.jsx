import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import ServiceExplorer from '../../pages/ServiceExplorer/index';
import MyServices from '../../pages/MyServices';
import Comments from '../../pages/Comments';
import Hirings from '../../pages/Hirings';
import SignUpPage from '../../pages/Signup';
import LoginPage from '../../pages/Login';
import logo from '../../assets/Logos/ElisirLogo.ico';

// const pages = ['Explorar Vinos', 'Mis Vinos', 'Comentarios', 'Contrataciones'];
const pages = ['Explorar Vinos', 'Mis Vinos'];
const pageRoutes = {
  'Explorar Vinos': {
    path: '/explorar-servicios',
    component: ServiceExplorer,
  },
  'Mis Vinos': { path: '/mis-servicios', component: MyServices },
  Comentarios: { path: '/comentarios', component: Comments },
  Contrataciones: { path: '/contrataciones', component: Hirings },
  Login: { path: '/login', component: LoginPage },
  Registro: { path: '/registro', component: SignUpPage },
  ProviderProfile: { path: '/perfil-proveedor' },
};
const homePage = { path: '/' };

const settings = ['Perfil', 'Cambiar contraseña', 'Salir'];

function ResponsiveAppBar({ isAuthenticated, onLogout }) {
  const [providerInfo, setProviderInfo] = useState(null); // Variable de estado para la información del proveedor
  useEffect(() => {
    fetch('http://localhost:3030/user', { credentials: 'include' })
      .then((response) => response.json())
      .then((user) => {
        setProviderInfo(user);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [isAuthenticated]);
  console.log(providerInfo);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    onLogout();
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: '#580427' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={`${homePage.path}`}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              '&:hover, &:active, &:focus': {
                textDecoration: 'none !important',
              },
            }}
          >
            <img
              src={logo}
              alt="Elisir Logo"
              style={{
                height: '30px',
                marginRight: '10px',
                verticalAlign: 'middle',
              }}
            />
            ELISIR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => {
                if (
                  !isAuthenticated &&
                  (page === 'Mis Vinos' ||
                    page === 'Comentarios' ||
                    page === 'Contrataciones')
                ) {
                  return null; // No renderizar estos botones si el usuario no está autenticado
                }
                return (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={`${pageRoutes[page].path}`}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={`${homePage.path}`}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              '&:hover, &:active, &:focus': {
                textDecoration: 'none',
              },
            }}
          >
            <img
              src={logo}
              alt="Company Logo"
              style={{
                height: '30px',
                marginRight: '10px',
                verticalAlign: 'middle',
              }}
            />
            ELISIR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              if (
                !isAuthenticated &&
                (page === 'Mis Vinos' ||
                  page === 'Comentarios' ||
                  page === 'Contrataciones')
              ) {
                return null; // No renderizar estos botones si el usuario no está autenticado
              }
              return (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={`${pageRoutes[page].path}`}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {!isAuthenticated ? (
              <Button component={Link} to="/login" sx={{ color: 'white' }}>
                Login
              </Button>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={`${providerInfo.user.nombre}`}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => {
                    let toPath;
                    if (setting === 'Salir') {
                      toPath = '/login';
                    } else if (setting === 'Perfil') {
                      toPath = '/perfil-proveedor';
                    } else if (setting === 'Cambiar contraseña') {
                      toPath = '/change-password'; // Ajusta esta ruta a donde desees que lleve esta opción.
                    }

                    return (
                      <MenuItem
                        key={setting}
                        onClick={
                          setting === 'Salir'
                            ? handleLogoutClick
                            : handleCloseUserMenu
                        }
                        component={Link}
                        to={toPath}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
