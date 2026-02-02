'use client';
import { useState } from "react";
import { login, register } from "../api/user";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(formData.name, formData.email, formData.password).then(async () => {
                const user = await login(formData.email, formData.password);
                if (user) {
                    router.push("/home");
                }
            });
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await login(formData.email, formData.password);
            if (user) {
                router.push("/home");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-xl">
                {isRegister ? (
                    <>
                        <h1 className="text-3xl font-bold text-foreground text-center mb-2">Create Account</h1>
                        <p className="text-muted-foreground text-center mb-8">Fill in the details to register</p>
                        <form className="space-y-5" onSubmit={handleAddUser}>
                            <div>
                                <label htmlFor="register-name" className="block text-sm font-medium text-foreground mb-1.5 ml-1">Full Name</label>
                                <input
                                    id="register-name"
                                    type="text"
                                    placeholder="John Doe"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label htmlFor="register-email" className="block text-sm font-medium text-foreground mb-1.5 ml-1">Email</label>
                                <input
                                    id="register-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    autoComplete="username"
                                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none 
                                    focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label htmlFor="register-password" className="block text-sm font-medium text-foreground mb-1.5 ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        id="register-password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-10"
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className={`w-full py-3.5 rounded-xl font-medium shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-0.5 ${loading ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                </button>
                            </div>
                        </form>
                        <div className="text-center mt-6">
                            <button
                                type="button"
                                onClick={() => setIsRegister(false)}
                                className="text-primary hover:text-primary/80 hover:underline text-sm font-medium transition-colors"
                            >
                                Already have an account? Sign In
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-foreground text-center mb-2">Welcome Back!</h1>
                        <p className="text-muted-foreground text-center mb-8">Login to your account</p>
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="login-email" className="block text-sm font-medium text-foreground mb-1.5 ml-1">Email</label>
                                <input
                                    id="login-email"
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                    autoComplete="username"
                                />
                            </div>
                            <div>
                                <label htmlFor="login-password" className="block text-sm font-medium text-foreground mb-1.5 ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all pr-10"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className={`w-full py-3.5 rounded-xl font-medium shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-0.5 ${loading ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>

                        </form>
                        <div className="text-center mt-6">
                            <button
                                type="button"
                                onClick={() => setIsRegister(true)}
                                className="text-primary hover:text-primary/80 hover:underline text-sm font-medium transition-colors"
                            >
                                Don&apos;t have an account? Create one
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
