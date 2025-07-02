import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path='/products/add' element={<AddProductPage />} />
        <Route path='/products/edit/:id' element={<EditProductPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Route>
    </Routes>

  );
}

export default App
