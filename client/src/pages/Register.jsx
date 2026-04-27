import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'staff'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Auto-hide notifications after 4 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                if (success) navigate('/login'); // Redirect after success message hides
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [error, success, navigate]);

    // FR-01: Client-side validation logic
    const validate = () => {
        const { fullName, password } = formData;
        if (fullName.length < 2) return "Full Name must be at least 2 characters.";

        // Password Requirement: Min 8 chars, 1 uppercase, 1 digit
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return "Password needs 8+ chars, 1 uppercase, and 1 digit.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            // FR-01: POST to /api/auth/register
            await API.post('/auth/register', formData);
            setSuccess(true); // Triggers the green popup
        } catch (err) {
            // FR-01: 409 Conflict / Error handling
            setError(err.response?.data?.message || "Registration failed. Email may be taken.");
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
                        <span className="text-xl">⚠️</span>
                        <span className="font-bold tracking-tight">{error}</span>
                    </div>
                </div>
            )}

            {/* --- GOOD POPUP UI: Success Notification --- */}
            {success && (
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50">
                    <div className="bg-emerald-500 text-white px-8 py-3 rounded-2xl shadow-[0_20px_50px_rgba(16,_185,_129,_0.3)] flex items-center space-x-3 border-b-4 border-emerald-700">
                        <span className="text-xl">✅</span>
                        <span className="font-bold tracking-tight">Account Created! Redirecting to login...</span>
                    </div>
                </div>
            )}

            {/* Registration Card */}
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-200 z-10">
                <div className="text-center mb-8">
                    <div className="inline-block bg-emerald-100 p-4 rounded-3xl mb-4">
                        <span className="text-3xl">📝</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Staff Join</h2>
                    <p className="text-slate-400 mt-2 font-medium">Create your staff member account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-400 ml-1 tracking-widest">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-5 py-3 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 transition-all"
                            placeholder="Jenny Smith"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-400 ml-1 tracking-widest">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-5 py-3 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 transition-all"
                            placeholder="jenny@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-400 ml-1 tracking-widest">Password</label>
                        <input
                            type="password"
                            className="w-full px-5 py-3 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <p className="text-[10px] text-slate-400 mt-1 ml-1 font-bold">Min. 8 chars, 1 Upper, 1 Digit</p>
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-slate-400 ml-1 tracking-widest">Select Role</label>
                        <select
                            className="w-full px-5 py-3 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-400 bg-white transition-all font-medium"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="staff">Staff Member</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-emerald-100 hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 ${loading ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            {loading ? (
                                <span className="animate-pulse">Creating Account...</span>
                            ) : 'Complete Registration'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 font-medium">
                        Already have an account? 
                        <Link to="/login" className="ml-1 text-emerald-600 hover:text-emerald-800 font-bold underline decoration-2 underline-offset-4">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-60"></div>
        </div>
    );
};

export default Register;