import {
    LoginForm,
    SignupForm,
    VerifyEmailForm,
    ForgotPasswordForm,
    ResetPasswordForm,
  } from 'wasp/client/auth'
  import { Link } from 'react-router-dom'
  import { authAppearance } from './appearance'
  
  export function Login() {
    return (
      <Layout>
        <LoginForm 
          appearance={authAppearance}
        />
        <br />
        <span className='customSpan'>
          <Link to="/signup">Signup</Link>&nbsp; | &nbsp;<Link to="/request-password-reset">Reset password</Link>
        </span>
      </Layout>
    );
  }
  
  export function Signup() {
    return (
      <Layout>
        <SignupForm 
          appearance={authAppearance}
        />
        <br />
        <span className='customSpan'>
          I already have an account (<Link to="/login">go to login</Link>).
        </span>
      </Layout>
    );
  }
  
  export function EmailVerification() {
    return (
      <Layout>
        <VerifyEmailForm 
        appearance={authAppearance}        
        />
        <br />
        <span className='customSpan'>
          If everything is okay, <Link to="/login">go to login</Link>
        </span>
      </Layout>
    );
  }
  
  export function RequestPasswordReset() {
    return (
      <Layout>
        <ForgotPasswordForm
        appearance={authAppearance}
         />
         <br/>
         <span className='customSpan'>
         <Link to="/login">Back to login</Link>
         </span>
      </Layout>
    );
  }
  
  export function PasswordReset() {
    return (
      <Layout>
        <ResetPasswordForm 
        appearance={authAppearance}
        />
        <br />
        <span className='customSpan'>
          If everything is okay, <Link to="/login">go to login</Link>
        </span>
      </Layout>
    );
  }
  
  export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div>{children}</div>
        </div>
    );
  }