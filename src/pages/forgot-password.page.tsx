import { FormEvent } from "react";

export default function ForgotPasswordPage(): JSX.Element {

  function submitForgotForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const email = (event.currentTarget.querySelector('input[name="email"]') as HTMLInputElement).value;

    if (!email) return


  }

  return (
    <div>
      <form onSubmit={submitForgotForm}>
        <h2>Forgot Password</h2>
        <input type="email" placeholder="email" name="email" />
        <input type="submit" value="Reset Password" />
      </form>
    </div>
  );
}