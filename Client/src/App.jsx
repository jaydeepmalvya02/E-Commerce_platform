import {BrowserRouter, Routes,Route} from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './components/Products/CollectionPage';
import ProductDetails from './components/Products/ProductDetails';
import Checkout from './components/Cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrderspage from './pages/MyOrderspage';
import MyOrdersPage from './pages/MyOrderspage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './components/Admin/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';

function App() {
 

  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
      <Routes>
        <Route path='/' element={<UserLayout/>}>{/* UserLayout */}
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='collections/:collection' element={<CollectionPage/>}/>
        <Route path='product/:id' element={<ProductDetails/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='order-confirmation' element={<OrderConfirmationPage/>}/>
        <Route path='order/:id' element={<OrderDetailsPage/>}/>
        <Route path='my-orders' element={<MyOrdersPage/>}/>
        </Route>
       
        <Route path='/admin'
        element={<AdminLayout/>}
        > {/* AdminLayout */}
        <Route index element={<AdminHomePage/>}/>
        <Route path="users" element={<UserManagement/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
