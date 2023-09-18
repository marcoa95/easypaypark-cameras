import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#0e6fb6',
      light: '#094d7f',
      dark: '#3e8bc4',
      contrastText: '#fff'
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  }
});

const theme = createTheme({
  palette: { ...defaultTheme.palette },
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true
      },
      styleOverrides: {
        root: {
          marginTop: defaultTheme.spacing(1),
          marginBottom: defaultTheme.spacing(1)
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          marginTop: defaultTheme.spacing(1.5),
          marginBottom: defaultTheme.spacing(1.5)
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: defaultTheme.palette.primary.main,
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: defaultTheme.palette.primary.contrastText,
          fontWeight: 'bold'
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: defaultTheme.palette.primary.main,
          color: defaultTheme.palette.primary.contrastText,
          textAlign: 'center'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: '80vw'
        }
      }
    },
  }
});

export default theme;
