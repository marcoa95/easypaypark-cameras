import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import CamerasListItem from './CamerasListItem';

const CamerasListTable = props => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead color="primary">
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Creado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cameras?.map(camera => <CamerasListItem key={camera.id} {...camera} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CamerasListTable;

