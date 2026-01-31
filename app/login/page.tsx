'use client';
import { useState } from "react";
import { IAddUser } from "../interfaces/User";
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
        const now = new Date().toISOString();
        const user: IAddUser = {
            ...formData,
            createdAt: now,
            updatedAt: now,
        };
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
        console.log(user);
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
                                <label className="block text-sm font-medium text-foreground mb-1.5 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5 ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5 ml-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                                    autoComplete="current-password"
                                />
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
                            <div className="text-center mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsRegister(false)}
                                    className="text-primary hover:text-primary/80 hover:underline text-sm font-medium transition-colors"
                                >
                                    Already have an account? Sign In
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold text-foreground text-center mb-2">Welcome Back!</h1>
                        <p className="text-muted-foreground text-center mb-8">Login to your account</p>
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5 ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                                    autoComplete="username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5 ml-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                                    autoComplete="current-password"
                                />
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

                            <div className="text-center mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsRegister(true)}
                                    className="text-primary hover:text-primary/80 hover:underline text-sm font-medium transition-colors"
                                >
                                    Don&apos;t have an account? Create one
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
