import { TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';

const UsersListItem = props => {
  return (
    <TableRow>
      <TableCell><Link to={props.id.toString()}>{props.username}</Link></TableCell>
      <TableCell>{props.email}</TableCell>
      <TableCell>{new Date(props.createdAt ?? null).toLocaleString()}</TableCell>
    </TableRow>
  );
}

export default UsersListItem;
