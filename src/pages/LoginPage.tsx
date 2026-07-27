import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, LogIn, UserPlus } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, signup } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
        // If login successful, navigate to previous page or dashboard
        navigate(from, { replace: true });
      } else {
        await signup(formData);
        // After signup, they are logged in, navigate to dashboard
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#FFFDF8] dark:bg-[#221D19] p-8 md:p-10 rounded-3xl border border-[#D8CFC2] dark:border-[#4A433D] shadow-2xl">
        <div className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-[#3F5B43] dark:text-[#8FAE83]" />
          <h2 className="mt-6 text-3xl font-serif font-bold text-[#2D241E] dark:text-[#F5F2ED]">
            {isLogin ? 'Sign in to your account' : 'Create an Account'}
          </h2>
          <p className="mt-2 text-sm text-[#6F665F] dark:text-[#C5BFB8]">
            {isLogin ? 'Welcome back to Shenoy Computers' : 'Join the luxury tech experience'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED] focus:border-[#3F5B43] dark:focus:border-[#8FAE83]"
                  placeholder="Alex Morgan"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED] focus:border-[#3F5B43] dark:focus:border-[#8FAE83]"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6F665F] dark:text-[#C5BFB8] mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#EEE6DA]/40 dark:bg-[#181512] border border-[#D8CFC2] dark:border-[#4A433D] rounded-xl p-3 outline-none text-[#2D241E] dark:text-[#F5F2ED] focus:border-[#3F5B43] dark:focus:border-[#8FAE83]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#3F5B43] hover:bg-[#2F4734] dark:bg-[#8FAE83] dark:hover:bg-[#78976E] text-white dark:text-[#181512] font-semibold rounded-full shadow-sm transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : isLogin ? (
              <LogIn className="w-5 h-5" />
            ) : (
              <UserPlus className="w-5 h-5" />
            )}
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-semibold text-[#C56A43] dark:text-[#C97A4D] hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
        
        {isLogin && (
          <div className="mt-6 p-4 bg-[#EEE6DA] dark:bg-[#181512] rounded-xl text-xs text-[#6F665F] dark:text-[#C5BFB8] text-center border border-[#D8CFC2] dark:border-[#4A433D]">
            <p className="font-bold mb-1">Demo Credentials:</p>
            <p>Admin: <span className="text-[#3F5B43] dark:text-[#8FAE83] font-mono">admin@shenoy.com</span> / <span className="font-mono">admin123</span></p>
          </div>
        )}
      </div>
    </div>
  );
};
