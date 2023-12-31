import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import RecordsListTable from './CameraDetailsRecordsListTable';
import AppPagination from '../../../../components/AppPagination';

import { resetRecordsState } from '../../../../slices/recordsSlice';
import { getRecordsList } from '../../../../actions/recordsActions';

const styles = {
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  }
}

const CameraDetailsRecords = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const records = useSelector(state => state.records.list);
  
  const [pagination, setPagination] = useState({ page: 1 });

  useEffect(() => {
    setPagination({ page: 1 });
    return () => dispatch(resetRecordsState());
  }, []);

  useEffect(() => {
    const f = { page: pagination.page, cameraId: params.id };

    dispatch(getRecordsList({ query: f }));
  }, [pagination]);


  const nextPage = () => setPagination({ page: pagination.page + 1 });
  const prevPage = () => setPagination({ page: Math.max(pagination.page - 1, 1) });

  return (
    <>
      <Box sx={styles.title}>
        <Typography variant="h5" fontWeight="bold">Registros</Typography>
      </Box>
      <RecordsListTable records={records} />
      <AppPagination page={pagination.page} prev={prevPage} next={nextPage} />
    </>
  );
}

export default CameraDetailsRecords;
