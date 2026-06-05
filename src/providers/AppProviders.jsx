import { AuthProvider } from '../context/AuthContext';
import { OrderProvider } from '../context/OrderContext';
import { UserProvider } from '../context/UserContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <OrderProvider>{children}</OrderProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
