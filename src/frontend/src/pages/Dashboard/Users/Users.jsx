import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import UsersListTable from './UsersListTable';
import UsersFilter from './UsersFilter';
import AppPagination from '../../../components/AppPagination';

import { resetUsersState } from '../../../slices/usersSlice';
import { getUsersList } from '../../../actions/usersActions';
import UsersCreateDialog from './UsersCreateDialog';

const defaultFilter = {
  username: '',
};

const styles = {
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  }
}

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.list);
  
  const [filter, setFilter] = useState({ ...defaultFilter });
  const [pagination, setPagination] = useState({ page: 1 });

  const [openNew, setOpenNew] = useState(false);

  useEffect(() => {
    setPagination({ page: 1 });
    return () => dispatch(resetUsersState());
  }, []);

  useEffect(() => {
    const f = { page: pagination.page };

    filter.username.length > 0 ? f.username = filter.username : null;

    dispatch(getUsersList({ query: f }));
  }, [pagination]);

  const handleChange = e => setFilter({ ...filter, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setPagination({ page: 1 });
  }

  const onClear = () => setFilter({ ...defaultFilter });

  const nextPage = () => setPagination({ page: pagination.page + 1 });
  const prevPage = () => setPagination({ page: Math.max(pagination.page - 1, 1) });

  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);

  return (
    <>
      <Box sx={styles.title}>
        <Typography variant="h5" fontWeight="bold">Usuarios</Typography>
        <Button onClick={handleOpenNew}>Nuevo</Button>
      </Box>
      <UsersFilter {...filter} onChange={handleChange} onSubmit={onSubmit} onClear={onClear} />
      <UsersListTable users={users} />
      <AppPagination page={pagination.page} prev={prevPage} next={nextPage} />
      <UsersCreateDialog open={openNew} onClose={handleCloseNew} />
    </>
  );
}

export default Users;
