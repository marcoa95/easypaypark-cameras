import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

const styles = {
  container: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  page: {
    paddingX: '0.5rem'
  }
}

const AppPagination = props => {
  return (
    <Box sx={styles.container}>
      <IconButton onClick={props.prev} disabled={props.page < 2}>
        <ArrowBackIosNew />
      </IconButton>
      <Typography variant="body1" sx={styles.page}>{props.page}</Typography>
      <IconButton onClick={props.next} disabled={props.page > props.max}>
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}

export default AppPagination;
