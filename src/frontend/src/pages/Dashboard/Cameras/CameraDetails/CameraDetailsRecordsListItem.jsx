import { TableRow, TableCell } from '@mui/material';

const CameraDetailsRecordsListItem = props => {
  return (
    <TableRow>
      <TableCell>{props.plate}</TableCell>
      <TableCell>{props.model}</TableCell>
      <TableCell>{props.camera?.type}</TableCell>
      <TableCell>{new Date(props.createdAt ?? null).toLocaleString()}</TableCell>
    </TableRow>
  );
}

export default CameraDetailsRecordsListItem;
