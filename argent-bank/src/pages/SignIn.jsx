import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, fetchUserProfileSuccess } from '../store/authSlice';

import { login, fetchUserProfile } from '../services/signInService';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loggedIn = await login(username, password);  
            const loginData = await loggedIn.json();

            if (loggedIn.ok) {
                // Modification de l'état
                const token = loginData.body.token;
                dispatch(loginSuccess(token));

                // Récupération de l'utilisateur + modification de l'état
                const user = await fetchUserProfile(token);
                if (user.ok) {
                    const userData = await user.json();
                    console.log(userData.body);
                    dispatch(fetchUserProfileSuccess(userData.body));
                } else {
                    setErrorMessage("Aucun utilisateur n'a été trouvé.");
                }
                navigate('/profile');
            } else {
                setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
            }
        } catch (err) {
            console.log(err);
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
                {errorMessage && <div className="error">{errorMessage}</div>}
                <button className="ab-button ab-sign-in__btn" type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;