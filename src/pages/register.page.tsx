import { FormEvent, useRef } from "react";
import { AppHttpService } from "../services/app-http.service";
import { HttpStatusCode } from "axios";
import { SERVER_API } from "../constants/server-api.enum";

export default function RegisterPage(): JSX.Element {
  /** - Data Transfer Object -
   * email: string;
   * password: string;
   * firstName: string;
   * lastName: string;
   * address: string;
   * city: string;
   * mobileNo: string;
   */

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const mobileNoRef = useRef<HTMLInputElement>(null);

  async function signupSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { email: emailRef.current?.value, password: passwordRef.current?.value, firstName: firstNameRef.current?.value, lastName: lastNameRef.current?.value, address: addressRef.current?.value, city: cityRef.current?.value, mobileNo: mobileNoRef.current?.value };

    const appHttpService: AppHttpService = new AppHttpService();
    try {
      const response = await appHttpService.post(SERVER_API.USER_REGISTER, payload);
      if (response.status === HttpStatusCode.Created) return alert('account created');
    } catch (error: any) {
      return alert(error.response.data);

    }
  }

  return (
    <div style={{ width: '100%', paddingTop: '5em', display: 'flex', justifyContent: 'center' }}>
      <form className='d-flex-col' style={{ maxWidth: '15em' }} onSubmit={signupSubmit}>
        <h1 className='mb-1' style={{ textAlign: 'center' }}>Register</h1>
        <input required={true} ref={emailRef} className='mb-1' name='email' type='text' placeholder='Email' />
        <input required={true} ref={passwordRef} className='mb-1' name='password' type='password' placeholder='Password' />
        <input required={true} ref={firstNameRef} className='mb-1' name='firstname' type='text' placeholder='First Name' />
        <input required={true} ref={lastNameRef} className='mb-1' name='lastname' type='text' placeholder='Last Name' />
        <input required={true} ref={addressRef} className='mb-1' name='address' type='text' placeholder='Address' />
        <input required={true} ref={cityRef} className='mb-1' name='city' type='text' placeholder='City' />
        <input required={true} ref={mobileNoRef} className='mb-1' name='mobileNo' type='text' placeholder='Mobile Number' />
        <input className='mb-1' type='submit' value='Register' />
      </form>
    </div>
  );
}