import { AuthProvider } from '../context/AuthContext';
import { OrderProvider } from '../context/OrderContext';
import { ProductProvider } from '../context/ProductContext';
import { UserProvider } from '../context/UserContext';

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <UserProvider>
          <OrderProvider>{children}</OrderProvider>
        </UserProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default AppProviders;
