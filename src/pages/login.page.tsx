import { FormEvent } from "react";

export default function LoginPage(): JSX.Element {
  function loginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div style={{ width: '100%', paddingTop: '5em', display: 'flex', justifyContent: 'center' }}>
      <form className='d-flex-col' style={{ maxWidth: '15em' }} onSubmit={loginSubmit}>
        <h1 className='mb-1' style={{ textAlign: 'center' }}>Login</h1>
        <input className='mb-1' name='username' type='text' placeholder='username or email' />
        <input className='mb-1' name='password' type='password' placeholder='password' />
        <input className='mb-1' type='submit' value='Login' />
      </form>
    </div>
  );
}