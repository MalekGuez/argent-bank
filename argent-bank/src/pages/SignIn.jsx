import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../store/authSlice';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector((state) => state.auth.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            });
  
            const data = await response.json();
            if (response.ok) {
                const token = data.body.token;
                dispatch(loginSuccess(token));
                navigate('/profile');
            } else {
                dispatch(loginFailure(data.message || 'Login failed'));
            }
        } catch (err) {
            dispatch(loginFailure('An error occurred. Please try again.'));
        }
    };
  
    return (
        <div className="ab-sign-in">
            <form className="ab-sign-in__container" onSubmit={handleLogin}>
                <div className="ab-sign-in__head">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                        <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8 .4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
                    </svg> <span>Sign In</span>
                </div>
                <div className="ab-sign-in__content">
                    <label htmlFor="username">Username</label>
                    <input className="ab-input" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label htmlFor="username">Password</label>
                    <input className="ab-input" type="password" id="password" name="password"  value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="ab-sign-in__rme">
                    <input type="checkbox" id="remember-me" name="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                {error && <div className="error">{error}</div>}
                <button className="ab-button ab-sign-in__btn" type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;