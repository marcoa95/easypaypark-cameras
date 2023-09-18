import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import CameraDetailsRecordsListItem from './CameraDetailsRecordsListItem';

const CameraDetailsRecordsListTable = props => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead color="primary">
          <TableRow>
            <TableCell>Placa</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.records?.map(record => <CameraDetailsRecordsListItem key={record.id} {...record} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CameraDetailsRecordsListTable;

