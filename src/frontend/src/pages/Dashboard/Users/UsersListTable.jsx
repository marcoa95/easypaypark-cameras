import { Paper, TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import UsersListItem from './UsersListItem';

const UsersListTable = props => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead color="primary">
          <TableRow>
            <TableCell>Nombre de usuario</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Desde</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users?.map(user => <UsersListItem key={user.id} {...user} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersListTable;

