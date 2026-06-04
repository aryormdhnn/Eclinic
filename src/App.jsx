import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from './components/Header';
import AppProviders from './providers/AppProviders';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
