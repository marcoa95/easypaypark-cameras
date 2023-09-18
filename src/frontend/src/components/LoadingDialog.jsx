import { Dialog, DialogContent, Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const styles = {
  container: {
    minWidth: '250px',
    minHeight: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const LoadingDialog = () => {
  const isLoading = useSelector(state => state.loading.isLoading);

  return (
    <Dialog
      open={isLoading}
    >
      <DialogContent>
        <Box sx={styles.container}>
          <CircularProgress />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default LoadingDialog;
