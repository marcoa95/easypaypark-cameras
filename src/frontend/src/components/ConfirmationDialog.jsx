import { Dialog, DialogContent, DialogTitle, Box, Button, DialogActions, Typography } from '@mui/material';

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
  }
}

const ConfirmationDialog = props => {
  const handleClose = e => {
    e.preventDefault();
    props.onClose();
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent sx={styles.content}>
        <Box sx={styles.container}>
          <Typography>{props.message}</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={styles.actions}>
      <Button variant="text" onClick={props.onConfirm}>Aceptar</Button>
        <Button variant="text" onClick={handleClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
