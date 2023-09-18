import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import RecordsListTable from './RecordsListTable';
import RecordsFilter from './RecordsFilter';
import AppPagination from '../../../components/AppPagination';

import { resetRecordsState } from '../../../slices/recordsSlice';
import { getRecordsList } from '../../../actions/recordsActions';

const defaultFilter = {
  plate: '',
  model: '',
  date: '',
};

const styles = {
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  }
}

const Records = () => {
  const dispatch = useDispatch();
  const records = useSelector(state => state.records.list);
  
  const [filter, setFilter] = useState({ ...defaultFilter });
  const [pagination, setPagination] = useState({ page: 1 });

  useEffect(() => {
    setPagination({ page: 1 });
    return () => dispatch(resetRecordsState());
  }, []);

  useEffect(() => {
    const f = { page: pagination.page };

    filter.plate.length > 0 ? f.plate = filter.plate : null;
    filter.model.length > 0 ? f.model = filter.model : null;
    filter.date.length > 0 ? f.date = filter.date : null;

    dispatch(getRecordsList({ query: f }));
  }, [pagination]);

  const handleChange = e => setFilter({ ...filter, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setPagination({ page: 1 });
  }

  const onClear = () => setFilter({ ...defaultFilter });

  const nextPage = () => setPagination({ page: pagination.page + 1 });
  const prevPage = () => setPagination({ page: Math.max(pagination.page - 1, 1) });

  return (
    <>
      <Box sx={styles.title}>
        <Typography variant="h5" fontWeight="bold">Registros</Typography>
      </Box>
      <RecordsFilter {...filter} onChange={handleChange} onSubmit={onSubmit} onClear={onClear} />
      <RecordsListTable records={records} />
      <AppPagination page={pagination.page} prev={prevPage} next={nextPage} />
    </>
  );
}

export default Records;
