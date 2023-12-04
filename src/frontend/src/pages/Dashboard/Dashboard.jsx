import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Edit, Menu } from '@mui/icons-material';
import AppDrawer from '../../components/AppDrawer';

import { getMe } from '../../actions/authActions';
import { setCount } from '../../slices/countSlice';
import EditDialog from '../../components/EditDialog';
import { setNewRecordToday, setRecordsToday } from '../../slices/recordsSlice';

const { VITE_TITLE, VITE_WS_BASE_URL } = import.meta.env;

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const openEdit = () => setEdit(true);
  const closeEdit = () => setEdit(false);

  const dispatch = useDispatch();
  const { count } = useSelector(state => state.count);

  useEffect(() => {
    dispatch(getMe());

    const socket = io(VITE_WS_BASE_URL);
    
    socket.on('connect', () => socket.emit('join', 'count'));

    socket.on('data', data => {
      dispatch(setRecordsToday(data));
      dispatch(setCount(data));
    });

    socket.on('new', payload => {
      dispatch(setNewRecordToday(payload));
    });

    return () => socket.close();
  }, []);

  return (
    <>
      <AppBar position="static" sx={{ padding: '0.5rem' }}>
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <IconButton edge="start" color="inherit" sx={{ mr: 1.5 }} onClick={openDrawer}>
              <Menu />
            </IconButton>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="h5" color="inherit" component="div">
                {VITE_TITLE}
              </Typography>
              <Typography variant="h5" color="inherit" component="div" fontWeight="bold">
                <IconButton edge="start" color="inherit" sx={{ mr: 1.5 }} onClick={openEdit}>
                  <Edit />
                </IconButton>
                {count} vehículos
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <AppDrawer open={open} onClose={closeDrawer} />
      {edit ? <EditDialog open={edit} onClose={closeEdit} /> : null}
      <Box component="main" sx={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </Box>
    </>
  );
}

export default Dashboard;
