import {BrowserRouter, Routes,Route} from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLayout/>}>{/* UserLayout */}</Route>
        <Route> {/* AdminLayout */}</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
