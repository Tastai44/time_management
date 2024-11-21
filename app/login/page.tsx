'use client';
import { useState } from "react";
import { addUser } from "../api/user";
import { IAddUser } from "../interfaces/User";


export default function Page() {
    const [isRegister, setIsRegister] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        const now = new Date().toISOString();
        const user: IAddUser = {
            ...formData,
            createdAt: now,
            updatedAt: now,
        };
        try {
            const newUser = await addUser(user);
            console.log("User created:", newUser);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    // const handleLogin = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         await checkUser(formData.email, formData.password).then((res) => {
    //             console.log(res?.name, "has logined successful!");
    //         });
    //     } catch (error) {
    //         console.error("Error creating user:", error);
    //     }
    // };

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-md">

                {isRegister ? (
                    <>
                        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">Create Account</h1>
                        <p className="text-gray-500 text-center mb-6">Fill in the details to register</p>
                        <form className="space-y-4" onSubmit={handleAddUser}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsRegister(false)}
                                    className="text-purple-500 hover:underline text-sm"
                                >
                                    Already have an account?
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">Welcome Back!</h1>
                        <p className="text-gray-500 text-center mb-6">Login to your account</p>
                        <form className="space-y-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="example@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsRegister(true)}
                                    className="text-purple-500 hover:underline text-sm"
                                >
                                    Don&apos;t have an account?
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </>
                )}
                {/* <>
                    <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">Welcome Back!</h1>
                    <p className="text-gray-500 text-center mb-6">Login to your account</p>
                    <form className="space-y-4"
                        action={checkUser}
                    >
                        <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            // value={formData.email}
                            // onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            // value={formData.password}
                            // onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="flex justify-between items-center mt-4">
                            <button
                                type="button"
                                // onClick={() => setIsRegister(true)}
                                className="text-purple-500 hover:underline text-sm"
                            >
                                Don&apos;t have an account?
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </> */}
            </div>
        </div >
    );
}
