import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import CamerasListTable from './CamerasListTable';
import CamerasFilter from './CamerasFilter';
import AppPagination from '../../../components/AppPagination';

import { resetCamerasState } from '../../../slices/camerasSlice';
import { getCamerasList } from '../../../actions/camerasActions';
import CamerasCreateDialog from './CamerasCreateDialog';

const defaultFilter = {
  name: '',
  type: ''
};

const styles = {
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  }
}

const Cameras = () => {
  const dispatch = useDispatch();
  const cameras = useSelector(state => state.cameras.list);
  
  const [filter, setFilter] = useState({ ...defaultFilter });
  const [pagination, setPagination] = useState({ page: 1 });

  const [openNew, setOpenNew] = useState(false);

  useEffect(() => {
    setPagination({ page: 1 });
    return () => dispatch(resetCamerasState());
  }, []);

  useEffect(() => {
    const f = { page: pagination.page };

    filter.name.length > 0 ? f.name = filter.name : null;
    filter.type.length > 0 ? f.type = filter.type : null;

    dispatch(getCamerasList({ query: f }));
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
        <Typography variant="h5" fontWeight="bold">Cámaras</Typography>
        <Button onClick={handleOpenNew}>Nuevo</Button>
      </Box>
      <CamerasFilter {...filter} onChange={handleChange} onSubmit={onSubmit} onClear={onClear} />
      <CamerasListTable cameras={cameras} />
      <AppPagination page={pagination.page} prev={prevPage} next={nextPage} />
      <CamerasCreateDialog open={openNew} onClose={handleCloseNew} />
    </>
  );
}

export default Cameras;
