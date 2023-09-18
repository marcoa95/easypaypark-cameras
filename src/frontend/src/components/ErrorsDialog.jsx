import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogTitle, Box, Typography, Button, DialogActions } from '@mui/material';

import { closeError } from '../slices/errorsSlice';

const styles = {
  content: {
    paddingY: 0
  },
  actions: {
    paddingTop: 0,
    paddingRight: '1rem'
  }
}

const ErrorsDialog = () => {
  const show = useSelector(state => state.errors.show);
  const errors = useSelector(state => state.errors.errors);

  const dispatch = useDispatch();

  const handleClose = e => {
    e.preventDefault();
    dispatch(closeError());
  }

  return (
    <Dialog
      open={show}
      onClose={handleClose}
    >
      <DialogTitle>Oops! Ha ocurrido un error</DialogTitle>
      <DialogContent>
        <Box sx={styles.container}>
          <ul>
            {errors.map(error => <li key={error}><Typography>{error}</Typography></li>)}
          </ul>
        </Box>
      </DialogContent>
      <DialogActions sx={styles.actions}>
        <Button variant="text" onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorsDialog;
