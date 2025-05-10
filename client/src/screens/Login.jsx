import React from 'react'
import './Login.css'
import {FaUser,FaLock} from "react-icons/fa"

const Login = () => {
  return (
    <div className='auth-pages login login-page'>
        <div className="item-left">
          <div className="text-container">
            <h1 className='login-bg-title'>Some thing better is Happening in the Dark!</h1>
            <p className="login-bg-subtitle">&mdash; Cpt. Birdy</p>
          </div>
          <div className="pattern-container">
            <div className="pattern-fader"></div>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%"><defs><pattern id="p" width={100} height={100} patternUnits="userSpaceOnUse"><path id="a" data-color="fill" fill="#FFF" d="M50 50H0V0h50v50zM35 35V15H15v20h20zM100 100H50V50h50v50zM85 85V65H65v20h20zM35 64.9571v20H15v-20zM85 14.9571v20H65v-20z" /></pattern></defs><rect fill="#5E9693" width="100%" height="100%" /><rect fill="url(#p)" width="100%" height="100%" /></svg>
          </div>
        </div>
        <div className="item-right">
          <form className="loginForm" action=''>
              <h1>Login</h1>
              <div className='input-box'>
                  <input type='text' placeholder='Username' required/>
                  <div className='input-icon-box'><FaUser className='icon'/></div>
              </div>
              <div className='input-box'>
                  <input type='password' placeholder='Password' required/>
                  <div className='input-icon-box'><FaLock className='icon'/></div>
              </div>
              <div className="remember-forgot">
                  <label ><input type='checkbox'/>Remember me</label>
                  <a href='#'> forgot password
                  </a>
              </div>

              <button type='submit'>Submit</button>
              <div className='register-link' ><p>Don't Have an Account? <a href='/register'>Register</a></p></div>
          </form>
        </div>


    </div>
  )
}

export default Login