import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import logogo from '../assets/logo.png';
import logomobo from '../assets/logomobo.png';

const Login = () => {

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');


      function login(e) {
        e.preventDefault();
        {
            const user={
                email,
                password,
            }
            console.log(user);
        }

    }
    return (
        <div className='auth-pages login login-page'>
            <div className="item-left">
                {/* Desktop logo */}
                <img src={logogo} alt="Logo" className="login-logo desktop-logo" />
                <div className="text-container">
                    <h1 className='login-bg-title'>Some thing better is Happening in the Dark!</h1>
                    <p className="login-bg-subtitle">&mdash; Cpt. Birdy</p>
                </div>
                <div className="pattern-container">
                    <div className="pattern-fader"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <defs>
                            <pattern id="p" width={100} height={100} patternUnits="userSpaceOnUse">
                                <path fill="#FFF" d="M50 50H0V0h50v50zM35 35V15H15v20h20zM100 100H50V50h50v50zM85 85V65H65v20h20zM35 64.9571v20H15v-20zM85 14.9571v20H65v-20z" />
                            </pattern>
                        </defs>
                        <rect fill="#5E9693" width="100%" height="100%" />
                        <rect fill="url(#p)" width="100%" height="100%" />
                    </svg>
                </div>
            </div>

            <div className="item-right">
                {/* Mobile logo */}
                <img src={logomobo} alt="Logo" className="login-logo mobile-logo" />
                <form className="loginForm">
                    <h1>Login</h1>
                    <div className='input-box'>
                    <input
                            type='email'
                            placeholder='Email'
                            required
                            autoComplete="username"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className='input-icon-box'><FaUser className='icon' /></div>
                    </div>
                    <div className='input-box'>
                    <input
                            type='password'
                            placeholder='Password'
                            required
                            autoComplete="new-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                             />
                        <div className='input-icon-box'><FaLock className='icon' /></div>
                    </div>
                    <div className="remember-forgot">
                        <label><input type='checkbox' />Remember me</label>
                        <a href='#'> forgot password</a>
                    </div>
                    <button type='submit' onClick={login}>Submit</button>
                    <div className='register-link'>
                        <p>Don't Have an Account? <a href='/register'>Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
