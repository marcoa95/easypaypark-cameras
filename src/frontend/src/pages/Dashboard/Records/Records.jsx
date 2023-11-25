import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import RecordsListTable from './RecordsListTable';

const styles = {
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  }
}

const Records = () => {
  const records = useSelector(state => state.records.today);

  return (
    <>
      <Box sx={styles.title}>
        <Typography variant="h5" fontWeight="bold">Registros</Typography>
      </Box>
      <RecordsListTable records={records} />
    </>
  );
}

export default Records;
