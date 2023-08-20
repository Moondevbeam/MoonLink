import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

function AuthPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Welcome to MoonLink</h2>
        <nav className="flex justify-center space-x-4 mb-8">
          <Link to="/auth/login" className="text-blue-500 hover:underline">Login</Link>
          <Link to="/auth/register" className="text-blue-500 hover:underline">Register</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default AuthPage;
