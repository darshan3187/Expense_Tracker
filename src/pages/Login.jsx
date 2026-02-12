import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Mail, Lock, Wallet } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import authService from '../firebase/auth';
import { login } from '../store/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const loginUser = async (data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login({ userData }));
                navigate("/expenses");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                        <Wallet size={28} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
                    <p className="mt-2 text-zinc-400">Manage your budget and savings seamlessly</p>
                </div>

                <Card className="border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl">
                    {error && (
                        <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(loginUser)} className="space-y-5">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            startIcon={Mail}
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                            error={errors.email}
                        />

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-zinc-400 ml-0.5">Password</label>
                                <Link to="#" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot password?</Link>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                startIcon={Lock}
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                error={errors.password}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full shadow-lg shadow-indigo-500/20 mt-2"
                            isLoading={loading}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-800"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-zinc-900 px-2 text-zinc-500">New around here?</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        onClick={() => navigate("/signup")}
                    >
                        Create an account
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default Login;
