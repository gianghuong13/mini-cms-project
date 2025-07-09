import axios from "axios";

const API_URL = 'http://localhost:1337/api/auth';

export const register = async (email, password) => {
    const res = await axios.post(`${API_URL}/register`, { email, password });
    return res.data;
};

export const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { token, user };
};