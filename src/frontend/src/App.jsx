import { ThemeProvider } from '@mui/material/styles'
import Router from './Router';
import LoadingDialog from './components/LoadingDialog';
import FeedbackAlert from './components/FeedbackAlert';
import ErrorsDialog from './components/ErrorsDialog';

import theme from './config/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <LoadingDialog />
      <FeedbackAlert />
      <ErrorsDialog />
    </ThemeProvider>
  );
}

export default App;
