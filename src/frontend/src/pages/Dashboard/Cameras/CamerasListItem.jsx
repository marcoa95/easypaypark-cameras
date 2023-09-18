import { TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';

const CamerasListItem = props => {
  return (
    <TableRow>
      <TableCell><Link to={props.id.toString()}>{props.name}</Link></TableCell>
      <TableCell>{props.type}</TableCell>
      <TableCell>{new Date(props.createdAt ?? null).toLocaleString()}</TableCell>
    </TableRow>
  );
}

export default CamerasListItem;
