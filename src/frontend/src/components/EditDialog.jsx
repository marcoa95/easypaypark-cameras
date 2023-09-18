import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';

import { updateCurrentCount } from '../actions/countActions';

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

const EditDialog = props => {
  const { count } = useSelector(state => state.count);
  const [value, setValue] = useState(count);

  const dispatch = useDispatch();

  const handleClose = e => {
    e.preventDefault();
    props.onClose();
  }

  const handleChange = e => setValue(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateCurrentCount({ count: value }));
    props.onClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>Editar número de vehículos</DialogTitle>
      <DialogContent sx={styles.content}>
        <Grid container>
          <Grid item xs={12} sx={styles.inputWrapper}>
            <TextField label="Nuevo valor" name="value" value={value} onChange={handleChange} />
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

export default EditDialog;
