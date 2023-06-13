import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { AppHttpService } from './services/app-http.service';
import { SERVER_API } from './constants/server-api.enum';
import { HttpStatusCode } from 'axios';
import cars from './assets/cars.json'
import { CarDealService } from './services/car-deal.service';
import { UserService } from './services/user.service';

function randomHexString(len: number): string {
  return [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ForgotPasswordPage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};


function HomePage(): JSX.Element {
  return <>Home Page</>
}

function LoginPage(): JSX.Element {
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

function RegisterPage(): JSX.Element {
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

function ForgotPasswordPage(): JSX.Element {

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

    if (!password || !confirmPassword || ( password != confirmPassword )) return;

    new UserService().forgotPassword({ token: tokenRef.current, password })
    
    // event.currentTarget.reset();
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

function CarsPage(): JSX.Element {

  const [visibleCarDetails, setVisibleCarDetails] = useState<boolean>(false);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  function showCarDetails(id: string) {
    console.log(id);
    setSelectedCarId(e => id);
    setVisibleCarDetails(e => true);
  }

  function modalClose() {
    setVisibleCarDetails(e => false)
  }

  function CarDetailsModal({ modalClose, car }: any) {
    function disableModalClose(event: any) {
      event.stopPropagation()
    }
  
    function contactDealer() {
      // const carDealService = new CarDealService();
      // carDealService.notifyAdmin({ carId: 'sdfsffsdf', dealerId: 'sdsadasd' });
    }
    return (
      <div onClick={modalClose} style={{ position: 'fixed', display: 'flex', justifyContent: 'center', color: 'black', backgroundColor: 'rgb(50, 50, 50, 0.6)', width: '100%', height: '100%' }}>
        <div onClick={disableModalClose} style={{ backgroundColor: 'white', overflowY: 'scroll', padding: '1em 5em', display: 'flex', flexDirection: 'column' }}>
          <h2>Car Details</h2>
          <div>
            <img className='mb-1' src="https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/wp-content/uploads/2017/03/2018-Bugatti-Chiron-119.jpg?crop=1xw:1xh;center,center&resize=480:*" alt="Avatar" style={{ width: '100%', maxWidth: '15em' }} />
            <p><span>Brand:</span> {car.brand || 'Not Available'}</p>
            <p><span>Model:</span> {car.model|| 'Not Available'}</p>
            <p><span>Fuel Type:</span> {car.fuelType || 'Not Available'}</p>
            <p><span>Body Type:</span> {car.bodyType || 'Not Available'}</p>
            <p><span>Transmission:</span> {car.transmission || 'Not Available'}</p>
            <p><span>Price:</span> {car.price || 'Not Available'}</p>
            <p><span>Color:</span> {car.color || 'Not Available'}</p>
            <p><span>Year:</span> {car.year || 'Not Available'}</p>
            <p><span>Engine Size:</span> {car.engineSize || 'Not Available'}</p>
            <p><span>Horsepower:</span> {car.horsepower || 'Not Available'}</p>
            <p><span>Seating Capacity:</span> {car.seatingCapacity || 'Not Available'}</p>
            <p><span>Mileage:</span> {car.mileage || 'Not Available'}</p>
            <p><span>Wheel Drive:</span> {car.wheelDrive || 'Not Available'}</p>
          </div>
          <div>
            <p><span>Features:</span></p>
            <ul>
              {
                car.features.map((e: string) => {
                  return <li key={randomHexString(10)}>{e}</li>
                })
              }
              {/* <li>Air Conditioning</li>
              <li>Power Windows</li>
              <li>Navigation System</li> */}
            </ul>
          </div>
          <div>
            <p><span>Safety Rating:</span> {car.safetyRating || 'Not Available'}</p>
          </div>
          <div className='mb-1'>
            <p><span>VIN:</span> {car.vin || 'Not Available'}</p>
            <p><span>Chassis Number:</span> {car.chassisNumber || 'Not Available'}</p>
          </div>
          <div>
            <button onClick={contactDealer} style={{ marginRight: '0.3em', cursor: 'pointer', backgroundColor: '#1383b3', padding: '0.3em', color: 'white', fontWeight: '700', border: '2px solid #1383b3' }} >Contact Dealer</button>
            <button onClick={modalClose} style={{ cursor: 'pointer', backgroundColor: '#1383b3', padding: '0.3em', color: 'white', fontWeight: '700', border: '2px solid #1383b3' }} >Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {visibleCarDetails && <CarDetailsModal modalClose={modalClose} car={cars.filter(e => e._id.$oid === selectedCarId)[0]} />}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {/* <Car onViewDetailsClick={showCarDetails} />
        <Car onViewDetailsClick={showCarDetails} />
        <Car onViewDetailsClick={showCarDetails} />
        <Car onViewDetailsClick={showCarDetails} />
        <Car onViewDetailsClick={showCarDetails} />
        <Car onViewDetailsClick={showCarDetails} />
        <Car onViewDetailsClick={showCarDetails} /> */}
        {
          cars.map((e) => {
            return <Car key={randomHexString(20)}
              onViewDetailsClick={showCarDetails}
              model={e.model}
              price={e.price}
              id={e._id.$oid}
            ></Car>
          })
        }
      </div>
    </>
  );
}

function Car({ onViewDetailsClick, model, price, id }: { onViewDetailsClick: (id: string) => void, model: string, price: string, id: string }) {

  function Star() {
    return <svg height="22" width="20" style={{ marginRight: '0.3em' }} data-rating="5">
      <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" fill='red' />
    </svg>
  }
  return (
    <div style={{ margin: '1em', display: 'flex', flexDirection: 'column', width: 'max-content', boxShadow: '0 0 8px 1px rgb(150, 150, 150)' }}>
      <img className='mb-1' src="https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/wp-content/uploads/2017/03/2018-Bugatti-Chiron-119.jpg?crop=1xw:1xh;center,center&resize=480:*" alt="Avatar" style={{ width: '100%', maxWidth: '15em' }} />
      <div style={{ padding: '0.5em' }}>
        <div style={{ marginBottom: '0.5em', fontSize: '1.5em', fontWeight: '700', overflow: 'hidden', width: '8em', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{model}</div>
        <div style={{ marginBottom: '0.5em' }}>
          <Star />
          <Star />
          <Star />
        </div>
        <div style={{ fontWeight: '500', fontSize: '0.8em', color: 'rgb(0, 0, 0, 0.5)' }}>Price starting at</div>
        <div style={{ fontWeight: '700', marginBottom: '0.5em' }}>${price}</div>
        <button onClick={() => { onViewDetailsClick(id) }} style={{ cursor: 'pointer', backgroundColor: '#1383b3', padding: '0.3em', color: 'white', fontWeight: '700', border: '2px solid #1383b3' }} >View Details</button>
      </div>
    </div>

  );
}

function NotFound(): JSX.Element {
  return <>Not Found!</>
}

export default App;
