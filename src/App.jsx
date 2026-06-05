import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppProviders from './providers/AppProviders';
import AppRoutes from './routes/AppRoutes';
import { MobileAppLayout } from './components/layout';

const AppContent = () => {
  return (
    <MobileAppLayout>
      <AppRoutes />
    </MobileAppLayout>
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
