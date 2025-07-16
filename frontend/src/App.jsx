import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import PrivateRoute from './components/PrivateRoute';

import PagesManagement from './pages/dynamic/PagesManagement';
import CreatePageConfig from './pages/dynamic/CreatePageConfig';
import EditPageConfig from './pages/dynamic/EditPageConfig';

import DynamicPage from './components/dynamic/DynamicPage';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/register' element={<RegisterPage />} />
      
      <Route path='/' element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/products/add' element={<AddProductPage />} />
        <Route path='/products/edit/:id' element={<EditProductPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/users' element={<UserPage />} />
        
        <Route path='/managePages' element={<PagesManagement />} />
        <Route path='/pages/create' element={<CreatePageConfig />} />
        <Route path='/pages/edit/:pageKey' element={<EditPageConfig />} />

        <Route path='/pages/:pageKey' element={<DynamicPage />} />
      </Route>
    </Routes>

  );
}

export default App
