import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import { AccountCircle, CompareArrows, Videocam } from '@mui/icons-material';

import { logout } from '../actions/authActions';

const items = [
  { text: 'Registros', icon: <CompareArrows />, path: '/dashboard/registros', protected: false },
  { text: 'Cámaras', icon: <Videocam />, path: '/dashboard/camaras', protected: false },
  { text: 'Usuarios', icon: <AccountCircle />, path: '/dashboard/usuarios', protected: true },
];

const styles = {
  drawer: {
    width: 230,
    flex: 1
  },
  logoWrapper: {
    justifyContent: 'center'
  },
  logo: {
    width: '75%',
    cursor: 'pointer'
  },
  dividerWrapper: {
    marginY: '0.75rem',
    paddingX: '1rem'
  },
  buttonWrapper: {
    textAlign: 'center',
    padding: '1rem'
  }
}

const AppDrawer = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(state => state.auth.data);

  const handleNavigate = path => () => {
    navigate(path);
    props.onClose();
  }

  const handleLogout = () => {
    dispatch(logout({ callback: () => navigate('/login') }));
  }

  return (
    <Drawer {...props}>
      <Box
        sx={styles.drawer}
        role="presentation"
      >
        <List>
          <ListItem sx={styles.logoWrapper}>
            <img src="/img/logo.png" alt="logo" style={styles.logo} onClick={handleNavigate("")} />
          </ListItem>
          <Box sx={styles.dividerWrapper}>
            <Divider />
          </Box>
          {items.filter(item => data?.super || !item.protected).map(item => 
            <ListItemButton key={item.text} onClick={handleNavigate(item.path)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          )}
        </List>
      </Box>
      <Box sx={styles.buttonWrapper}>
        <Button fullWidth variant="text" onClick={handleLogout}>Cerrar sesión</Button>
      </Box>
    </Drawer>
  );
}

export default AppDrawer;

