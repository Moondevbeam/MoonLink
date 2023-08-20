import React from 'react';
import { useForm } from 'react-hook-form';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password);
      console.log('Login successful');
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" {...register('email', { required: true })} className="mt-1 p-2 w-full border rounded" />
        {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" {...register('password', { required: true })} className="mt-1 p-2 w-full border rounded" />
        {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full" disabled={formState.isSubmitting}>
        Login
      </button>
    </form>
  );
}

export default LoginForm;
