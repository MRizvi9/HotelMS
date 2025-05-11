// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from '..screens/Login';
import RegisterForm from '..screens/Register';
import logogo from '../assets/logo.png';
import '../screens/Login.css'

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <div className={`auth-pages login-page ${isRegister ? 'register-mode' : ''}`}>
            <div className="item-left">
                <img src={logogo} alt="Logo" className="login-logo desktop-logo" />
                <div className="text-container">
                    <h1 className='login-bg-title'>
                        {isRegister ? "Join Our Trading Community Today!" : "Some thing better is Happening in the Dark!"}
                    </h1>
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
                {isRegister ? (
                    <RegisterForm setIsRegister={setIsRegister} />
                ) : (
                    <LoginForm setIsRegister={setIsRegister} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
