import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField } from '@mui/material';

import { updateCurrentCamera } from '../../../../actions/camerasActions';

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

const CameraDetailsForm = () => {
  const [camera, setCamera] = useState({
    _id: '',
    name: '',
    type: false,
  });

  const dispatch = useDispatch();
  const current = useSelector(state => state.cameras.current);
    
  useEffect(() => setCamera({ ...camera, ...current }), [current]);

  const handleChange = e => {
    setCamera({ ...camera, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(updateCurrentCamera({
      id: camera.id,
      camera
    }));
  }

  return (
    <Card sx={styles.card}>
      <CardHeader title="Datos de la cámara" />
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <TextField label="Nombre" name="name" value={camera.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6} sx={styles.inputWrapper}>
            <TextField select label="Tipo" name="type" value={camera.type} onChange={handleChange}>
              <MenuItem value="Entrada">Entrada</MenuItem>
              <MenuItem value="Salida">Salida</MenuItem>
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

export default CameraDetailsForm;
