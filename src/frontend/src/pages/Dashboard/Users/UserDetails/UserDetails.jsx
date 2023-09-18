import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import UserDetailsForm from './UserDetailsForm';
import UserDetailsResetPassword from './UserDetailsResetPassword';

import { getCurrentUser } from '../../../../actions/usersActions';
import { resetUsersState } from '../../../../slices/usersSlice';

const styles = {
  title: {
    marginBottom: '1rem'
  },
  column: {
    paddingX: '1rem'
  }
}

const UserDetails = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const current = useSelector(state => state.users.current);

  useEffect(() => {
    dispatch(getCurrentUser({ id: params.id }));
    
    return () => {
      dispatch(resetUsersState());
    }
  }, []);

  return (
    <>
      <Typography variant="h5" sx={styles.title} fontWeight="bold">Usuario {current.username ?? params.id}</Typography>
      <Grid container>
        <Grid item xs={12} sx={styles.column}>
          <UserDetailsForm />
          <UserDetailsResetPassword />
        </Grid>
      </Grid>
    </>
  );
}

export default UserDetails;
