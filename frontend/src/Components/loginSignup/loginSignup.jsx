import React from 'react';
import './LoginSignup.css';

import name_icon from '../Assets/name_icon.png';
import email_icon from '../Assets/email_icon.png';
import password_icon from '../Assets/password_icon.png';

export const LoginSignup = () => {
  return (
    <div className= 'container'>
      <div className="header">
        <div className='text'>Sign up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={name_icon} alt=''/>
          <input type='name' placeholder='Name'/>
        </div>
        <div className='input'>
          <img src={email_icon} alt=''/>
          <input type='email' placeholder='Email'/>
        </div>
        <div className='input'>
          <img src={password_icon} alt=''/>
          <input type='password' placeholder='Password'/>
        </div>
        <div className='forgot-password'>Forgot Password</div>
      </div>  
        <div className='submit-container'>
          <div className='submit'>Sign up</div>
          <div className='submit'>Login</div>
      </div>
    </div>
  )
}

export default LoginSignup;
