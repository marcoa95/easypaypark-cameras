import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import RecordsListTable from '../Records/RecordsListTable';
import RecordsFilter from '../Records/RecordsFilter';
import AppPagination from '../../../components/AppPagination';

import { resetRecordsState } from '../../../slices/recordsSlice';
import { downloadRecordsReport, getRecordsList } from '../../../actions/recordsActions';
import { getCamerasList } from '../../../actions/camerasActions';
import { resetCamerasState } from '../../../slices/camerasSlice';
import { Download } from '@mui/icons-material';

const defaultFilter = {
  plate: '',
  model: '',
  camera: '',
  type: '',
  start: '',
  end: '',
};

const styles = {
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  }
}

const History = () => {
  const dispatch = useDispatch();
  const records = useSelector(state => state.records.list);
  
  const [filter, setFilter] = useState({ ...defaultFilter });
  const [pagination, setPagination] = useState({ page: 1 });

  useEffect(() => {
    setPagination({ page: 1 });
    dispatch(getCamerasList({ query: { results: 9999 } }));
    return () => {
      dispatch(resetRecordsState());
      dispatch(resetCamerasState());
    }
  }, []);

  useEffect(() => {
    const f = { page: pagination.page };

    filter.plate.length > 0 ? f.plate = filter.plate : null;
    filter.model.length > 0 ? f.model = filter.model : null;
    filter.camera ? f.camera = filter.camera : null;
    filter.type.length > 0 ? f.type = filter.type : null;
    filter.start.length > 0 ? f.start = filter.start : null;
    filter.end.length > 0 ? f.end = filter.end : null;

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

  const handleDownloadReport = () => {
    const f = { results: Number.MAX_SAFE_INTEGER };

    filter.plate.length > 0 ? f.plate = filter.plate : null;
    filter.model.length > 0 ? f.model = filter.model : null;
    filter.camera ? f.camera = filter.camera : null;
    filter.type.length > 0 ? f.type = filter.type : null;
    filter.start.length > 0 ? f.start = filter.start : null;
    filter.end.length > 0 ? f.end = filter.end : null;

    dispatch(downloadRecordsReport({ query: f }));
  }

  return (
    <>
      <Box sx={styles.title}>
        <Typography variant="h5" fontWeight="bold">Registros</Typography>
        <Button onClick={handleDownloadReport}>Reporte <Download sx={{ ml: '0.5rem' }} /></Button>
      </Box>
      <RecordsFilter {...filter} onChange={handleChange} onSubmit={onSubmit} onClear={onClear} />
      <RecordsListTable records={records} />
      <AppPagination page={pagination.page} prev={prevPage} next={nextPage} />
    </>
  );
}

export default History;
