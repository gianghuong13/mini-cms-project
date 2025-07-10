import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginService } from '../services/authService';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchProfile(); 
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setUser(res.data.user);
    } catch (err) {
      setError(err.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await loginService(email, password);
    console.log("Login response:", data);
    const { token, user } = data;
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
