import { FormEvent, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { UserService } from "../services/user.service";

export default function ResetPasswordPage(): JSX.Element {

  const location = useLocation();
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    if (token) tokenRef.current = token;

    return () => {
      tokenRef.current = null;
    };
  }, [location]);

  function submitPassword(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const [password, confirmPassword] = [(event.currentTarget.querySelector('input[name="password"]') as HTMLInputElement).value, (event.currentTarget.querySelector('input[name="confirm-password"]') as HTMLInputElement).value]

    if (!password || !confirmPassword || (password != confirmPassword)) return;

    new UserService().resetPassword({ token: tokenRef.current, password })

    event.currentTarget.reset();
  }

  return (
    <div style={{ marginTop: '5em', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={submitPassword} style={{ display: 'flex', flexDirection: 'column', maxWidth: '15em' }} >
        <h2 className='mb-1'>Reset Password</h2>
        <input className='mb-1' type='password' name='password' placeholder='new password' required={true} />
        <input className='mb-1' type='password' name='confirm-password' placeholder='confirm password' required={true} />
        <input className='mb-1' type='submit' value='set password' />
      </form>
    </div>)
}