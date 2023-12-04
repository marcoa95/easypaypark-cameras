import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Collapse, Typography, Box, Grid, TextField, Button, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const styles = {
  paper: {
    marginBottom: '1rem'
  },
  header: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'around'
  },
  title: {
    flex: 1
  },
  container: {
    padding: '1rem',
    paddingTop: '0'
  },
  inputWrapper: {
    paddingX: '0.5rem'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}

const RecordsFilter = props => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const cameras = useSelector(state => state.cameras.list);

  return (
    <Paper elevation={3} sx={styles.paper}>
      <Box sx={styles.header} onClick={toggleOpen}>
        <Typography variant="h6" fontWeight="bold" sx={styles.title}>Filtro</Typography>
        <ArrowDropDownIcon />
      </Box>
      <Collapse in={open}>
        <Grid container component="form" sx={styles.container} onSubmit={props.onSubmit}>
          <Grid item xs={6} sx={styles.inputWrapper}>
            <TextField label="Placa" name="plate" value={props.plate} onChange={props.onChange} />
          </Grid>
          <Grid item xs={6} sx={styles.inputWrapper}>
            <TextField label="Modelo" name="model" value={props.model} onChange={props.onChange} />
          </Grid>
          <Grid item xs={6} sx={styles.inputWrapper}>
            <TextField select label="Cámara" name="camera" value={props.camera} onChange={props.onChange}>
              <MenuItem value="">Cualquiera</MenuItem>
              {cameras.map(camera => <MenuItem key={camera.id} value={camera.id}>{camera.name}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={6} sx={styles.inputWrapper}>
            <TextField select label="Tipo" name="type" value={props.type} onChange={props.onChange}>
              <MenuItem value="">Cualquiera</MenuItem>
              <MenuItem value="Entrada">Entrada</MenuItem>
              <MenuItem value="Salida">Salida</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6} sx={styles.inputWrapper}>
            <TextField label="Fecha inicial" name="start" value={props.start} type="date" onChange={props.onChange} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={6} sx={styles.inputWrapper}>
            <TextField label="Fecha final" name="end" value={props.end} type="date" onChange={props.onChange} InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sx={styles.actions}>
            <Button type="submit">Buscar</Button>
            <Button onClick={props.onClear} color="neutral">Limpiar</Button>
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
}

export default RecordsFilter;
