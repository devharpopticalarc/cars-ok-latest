import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './pages/forgot-password.page';
import HomePage from './pages/home.page';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import ResetPasswordPage from './pages/reset-password.page';
import CarsPage from './pages/cars.page';
import NotFound from './pages/not-found.page';



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
