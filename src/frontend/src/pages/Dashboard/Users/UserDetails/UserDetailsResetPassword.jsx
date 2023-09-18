import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Card, CardHeader, CardContent, TextField } from '@mui/material';

import { resetCurrentUserPassword } from '../../../../actions/usersActions';

const styles = {
  card: {
    marginBottom: '1.5rem'
  },
  content: {
    textAlign: 'center'
  }
}

const UserDetailsResetPassword = () => {
  const [password, setPassword] = useState('');

  const params = useParams();

  const dispatch = useDispatch();

  const handleChange = e => setPassword(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetCurrentUserPassword({ id: params.id, password }));
  }
  
  return (
    <Card sx={styles.card}>
      <CardHeader title="Restablecer contraseña" />
      <CardContent sx={styles.content}>
         <TextField name="password" value={password} onChange={handleChange} placeholder="Contraseña nueva" />
         <Button onClick={handleSubmit}>Actualizar</Button>
      </CardContent>
    </Card>
  );
}

export default UserDetailsResetPassword;
