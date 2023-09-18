import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';

import { login } from '../../actions/authActions';

const styles = {
  wrapper: {
    backgroundColor: 'primary.main',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  }
};

const Login = () => {
  const [state, setState] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ ...state, callback: handleLogin }));
  }

  const handleLogin = () => {
    navigate('/dashboard');
  }

  return (
    <Grid container sx={styles.wrapper}>
      <Grid item maxWidth="550px">
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center' }}>
              <img style={{ width: '80%' }} src="/img/logo_bg.png" alt="logo" />
            </Box>
            <Grid container px={2} paddingBottom={2} component="form" onSubmit={handleSubmit}>
              <Grid item xs={12} textAlign="center" marginBottom={2}>
                <Typography variant="h4">Inicia sesión</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Nombre de usuario" name="username" value={state.username} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Contraseña" type="password" name="password" value={state.password} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button type="submit">Entrar</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;
