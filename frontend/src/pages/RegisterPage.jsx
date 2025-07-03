import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register(email, password);
            navigate('/login');
        } catch (err) {
            alert("Register failed:", err?.response?.data?.error);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
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
                Submit
            </button>
        </form>
    </div>
  )
}

export default RegisterPage