import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, TextField, Dialog, DialogContent, DialogTitle, Button, DialogActions, MenuItem } from '@mui/material';

import { createNewCamera } from '../../../actions/camerasActions';

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

const CamerasCreateDialog = props => {
  const [camera, setCamera] = useState({
    name: '',
    type: 'Entrada',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = e => {
    e.preventDefault();
    props.onClose();
  }

  const handleChange = e => {
    setCamera({ ...camera, [e.target.name]: e.target.value });
  }

  const handleRedirect = id => {
    navigate('/dashboard/camaras/' + id);
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(createNewCamera({ camera, callback: handleRedirect }));
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>Nueva cámara</DialogTitle>
      <DialogContent sx={styles.content}>
        <Grid container>
          <Grid item xs={12} sx={styles.inputWrapper}>
            <TextField label="Nombre" name="name" value={camera.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sx={styles.inputWrapper}>
            <TextField select label="Tipo" name="type" value={camera.type} onChange={handleChange}>
              <MenuItem value="">Cualquiera</MenuItem>
              <MenuItem value="Entrada">Entrada</MenuItem>
              <MenuItem value="Salida">Salida</MenuItem>
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

export default CamerasCreateDialog;
