import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import CameraDetailsForm from './CameraDetailsForm';
import CameraDetailsRecords from './CameraDetailsRecords';

import { getCurrentCamera } from '../../../../actions/camerasActions';
import { resetCamerasState } from '../../../../slices/camerasSlice';

const styles = {
  title: {
    marginBottom: '1rem'
  },
  column: {
    paddingX: '1rem'
  }
}

const CameraDetails = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const current = useSelector(state => state.cameras.current);

  useEffect(() => {
    dispatch(getCurrentCamera({ id: params.id }));
    
    return () => {
      dispatch(resetCamerasState());
    }
  }, []);

  return (
    <>
      <Typography variant="h5" sx={styles.title} fontWeight="bold">Cámara {current.name ?? params.id}</Typography>
      <Grid container>
        <Grid item xs={12} sx={styles.column}>
          <CameraDetailsForm />
          <CameraDetailsRecords />
        </Grid>
      </Grid>
    </>
  );
}

export default CameraDetails;
