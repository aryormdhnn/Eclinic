import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from './components/Header';
import AppProviders from './providers/AppProviders';
import AppRoutes from './routes/AppRoutes';

const AppContent = () => {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
};

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
