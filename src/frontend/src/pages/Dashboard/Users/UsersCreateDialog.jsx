import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, TextField, Dialog, DialogContent, DialogTitle, Button, DialogActions, MenuItem } from '@mui/material';

import { createNewUser } from '../../../actions/usersActions';

const styles = {
  container: {
    display: 'block'
  },
  content: {
    paddingY: 0
  },
  actions: {
    paddingTop: 0,
    paddingRight: '1rem'
  },
  inputWrapper: {
    paddingX: '0.25rem'
  },
}

const UsersCreateDialog = props => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    super: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = e => {
    e.preventDefault();
    props.onClose();
  }

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleRedirect = id => {
    navigate('/dashboard/usuarios/' + id);
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(createNewUser({ user, callback: handleRedirect }));
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>Nuevo usuario</DialogTitle>
      <DialogContent sx={styles.content}>
        <Grid container>
          <Grid item xs={12} sx={styles.inputWrapper}>
            <TextField label="Nombre de usuario" name="username" value={user.username} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sx={styles.inputWrapper}>
            <TextField label="Correo" name="email" value={user.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sx={styles.inputWrapper}>
            <TextField label="Contraseña" name="password" value={user.password} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sx={styles.inputWrapper}>
            <TextField select label="Nivel de permisos" name="super" value={user.super} onChange={handleChange}>
              <MenuItem value={true}>Administrador</MenuItem>
              <MenuItem value={false}>Operador</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={styles.actions}>
      <Button variant="text" onClick={handleSubmit}>Guardar</Button>
        <Button variant="text" onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UsersCreateDialog;
