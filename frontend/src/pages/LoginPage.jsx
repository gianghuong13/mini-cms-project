import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            navigate('/dashboard');    
        } catch (err) {
            alert("Login failed: " + err.response?.data?.error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-green-50">
            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 w-full max-w-md border border-green-200"
            >
                <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Login</h2>
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button 
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                >
                    Login
                </button>

                <div className="text-center mt-4">
                    <p className="text-gray-600">Don't have an account?</p>
                    <Link to="/register" className="text-green-600 hover:underline">Register here</Link>
                </div>
            </form>
        </div>
  )
}

export default LoginPage