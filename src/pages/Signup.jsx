import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Mail, Lock, User, Wallet } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import authService from '../firebase/auth';
import { login } from '../store/authSlice';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const create = async (data) => {
        setError("");
        setLoading(true);
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) dispatch(login({ userData: currentUser }));
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
                    <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
                    <p className="mt-2 text-zinc-400">Join us to start tracking your finances effectively</p>
                </div>

                <Card className="border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl">
                    {error && (
                        <div className="mb-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(create)} className="space-y-5">
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            startIcon={User}
                            {...register("name", { required: "Name is required" })}
                            error={errors.name}
                        />
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
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            startIcon={Lock}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" }
                            })}
                            error={errors.password}
                        />

                        <Button
                            type="submit"
                            className="w-full shadow-lg shadow-indigo-500/20 mt-2"
                            isLoading={loading}
                        >
                            Get Started
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-800"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-zinc-900 px-2 text-zinc-500">Already have an account?</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </Button>
                </Card>

                <p className="mt-8 text-center text-sm text-zinc-500">
                    By clicking continue, you agree to our{' '}
                    <Link to="#" className="underline-offset-4 hover:text-indigo-400 hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="#" className="underline-offset-4 hover:text-indigo-400 hover:underline">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
};

export default Signup;
