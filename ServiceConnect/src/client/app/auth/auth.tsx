import {
    LoginForm,
    SignupForm,
    VerifyEmailForm,
    ForgotPasswordForm,
    ResetPasswordForm,
  } from 'wasp/client/auth'
  import { Link } from 'react-router-dom'
  
  export function Login() {
    return (
      <Layout>
        <LoginForm />
        <br />
        <span className='customSpan'>
          Don't have an account yet? <Link to="/signup">go to signup</Link>.
        </span>
        <br />
        <span className='customSpan'>
          Forgot your password? <Link to="/request-password-reset">reset it</Link>
          .
        </span>
      </Layout>
    );
  }
  
  export function Signup() {
    return (
      <Layout>
        <SignupForm />
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
        <VerifyEmailForm />
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
        <ForgotPasswordForm />
      </Layout>
    );
  }
  
  export function PasswordReset() {
    return (
      <Layout>
        <ResetPasswordForm />
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