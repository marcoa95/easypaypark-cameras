import { useSelector, useDispatch } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';

import { closeAlert } from '../slices/alertsSlice';

const FeedbackAlert = () => {
  const show = useSelector(state => state.alerts.show);
  const message = useSelector(state => state.alerts.message);
  const type = useSelector(state => state.alerts.type);

  const dispatch = useDispatch();

  const handleClose = e => {
    e?.preventDefault();
    dispatch(closeAlert());
  }

  return(
    <Snackbar open={show} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type ?? 'info'} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default FeedbackAlert;
