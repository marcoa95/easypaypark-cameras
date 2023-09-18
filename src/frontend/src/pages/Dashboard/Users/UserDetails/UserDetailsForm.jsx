import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField } from '@mui/material';

import { updateCurrentUser } from '../../../../actions/usersActions';

const styles = {
  card: {
    marginBottom: '1.5rem'
  },
  inputWrapper: {
    paddingX: '0.5rem'
  },
  title: {
    py: '1rem'
  },
  companyWrapper: {
    display: 'flex',
    alignItems: 'center'
  }
}

const UserDetailsForm = () => {
  const [user, setUser] = useState({
    _id: '',
    username: '',
    email: '',
    super: false,
  });

  const dispatch = useDispatch();
  const current = useSelector(state => state.users.current);
    
  useEffect(() => setUser({ ...user, ...current }), [current]);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(updateCurrentUser({
      id: user.id,
      user
    }));
  }

  return (
    <Card sx={styles.card}>
      <CardHeader title="Datos del usuario" />
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <TextField label="Nombre de usuario" name="username" value={user.username} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <TextField label="Correo electrónico" name="email" value={user.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <TextField select label="Superusuario" name="super" value={user.super} onChange={handleChange}>
              <MenuItem value={true}>Sí</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button color="primary" onClick={handleSubmit}>Guardar</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserDetailsForm;
