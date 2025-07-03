import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

const LoginPage = () => {
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
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                />

                <input 
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <button type="submit">
                    Login
                </button>
            </form>
            <div>
                <h4>Not have an account yet?</h4>
                <Link to={`/register`}>
                    <div>Register</div>
                </Link>
            </div>
        </div>
  )
}

export default LoginPage