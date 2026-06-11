import { useState } from 'react';
import { login, register } from '../api';
import './auth.css';

function Auth({ setUser }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = isLogin ? await login(formData) : await register(formData);
            localStorage.setItem('token', data.token);
            setUser(data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
                <p className="subtitle">
                    {isLogin ? 'Welcome back! Please enter your details.' : 'Start managing your expenses today.'}
                </p>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-field">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                required
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    )}
                    <div className="form-field">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-field">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            required
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button type="submit">{isLogin ? 'Sign In' : 'Create Account'}</button>
                </form>
                
                <p className="toggle-auth">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? ' Sign Up' : ' Log In'}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Auth;
