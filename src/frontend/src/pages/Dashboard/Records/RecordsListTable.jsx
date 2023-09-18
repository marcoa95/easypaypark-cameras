import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import RecordsListItem from './RecordsListItem';

const RecordsListTable = props => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead color="primary">
          <TableRow>
            <TableCell>Placa</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Cámara</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.records?.map(record => <RecordsListItem key={record.id} {...record} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecordsListTable;

