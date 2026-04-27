import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Auto-hide the popup after 4 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // FR-02: POST request to login
            const { data } = await API.post('/auth/login', { email, password });
            
            // Store token and role for the Dashboard
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);
            localStorage.setItem('fullName', data.user.fullName);
            
            navigate('/dashboard');
        } catch (err) {
            // Display floating error popup
            setError(err.response?.data?.message || 'Access Denied: Invalid Credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 relative overflow-hidden">
            
            {/* --- GOOD POPUP UI: Error Notification --- */}
            {error && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                    <div className="bg-red-600 text-white px-8 py-3 rounded-2xl shadow-[0_20px_50px_rgba(220,_38,_38,_0.3)] flex items-center space-x-3 border-b-4 border-red-800">
                        <span className="text-xl">🚫</span>
                        <span className="font-bold tracking-tight">{error}</span>
                    </div>
                </div>
            )}

            {/* Login Card */}
            <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 border border-slate-200 transition-all">
                <div className="text-center mb-8">
                    <div className="inline-block bg-blue-100 p-4 rounded-3xl mb-4">
                        <span className="text-3xl">🏢</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Staff Login</h2>
                    <p className="text-slate-400 mt-2 font-medium">Regional Co-working Space Portal</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-400 ml-1 tracking-widest">Email Address</label>
                        <input 
                            type="email" 
                            className={`w-full px-5 py-3 border rounded-2xl outline-none focus:ring-4 transition-all ${error ? 'border-red-200 focus:ring-red-50' : 'border-slate-200 focus:ring-blue-50 focus:border-blue-400'}`}
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-400 ml-1 tracking-widest">Secure Password</label>
                        <input 
                            type="password" 
                            className={`w-full px-5 py-3 border rounded-2xl outline-none focus:ring-4 transition-all ${error ? 'border-red-200 focus:ring-red-50' : 'border-slate-200 focus:ring-blue-50 focus:border-blue-400'}`}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 ${loading ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Verifying...</span>
                                </span>
                            ) : 'Sign Into Portal'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                        New staff member? 
                        <Link to="/register" className="ml-1 text-blue-600 hover:text-blue-800 font-bold underline decoration-2 underline-offset-4">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        </div>
    );
};

export default Login;