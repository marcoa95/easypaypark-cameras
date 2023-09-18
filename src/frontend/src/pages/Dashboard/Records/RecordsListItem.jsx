import { TableRow, TableCell } from '@mui/material';

const RecordsListItem = props => {
  return (
    <TableRow>
      <TableCell>{props.plate}</TableCell>
      <TableCell>{props.model}</TableCell>
      <TableCell>{props.camera?.name}</TableCell>
      <TableCell>{props.camera?.type}</TableCell>
      <TableCell>{new Date(props.createdAt ?? null).toLocaleString()}</TableCell>
    </TableRow>
  );
}

export default RecordsListItem;
