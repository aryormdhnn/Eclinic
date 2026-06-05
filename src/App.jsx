import { BrowserRouter, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from './components/Header';
import AppProviders from './providers/AppProviders';
import AppRoutes from './routes/AppRoutes';

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {!isHome && <Header />}
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
