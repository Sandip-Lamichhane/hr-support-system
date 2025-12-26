import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {

            // Step 1: Send login request
            await login({ email, password });
            navigate("/admin/dashboard");

        } catch (error) {
            if (error.response?.data?.errors){
                const backendErrors = Object.values(
                    error.response.data.errors
                ).flat();
                setErrors(backendErrors);
            }else
                setErrors(["Login Failed!"]);
        }
    };


    return (
        <section className="bg-[#CEE1FF] flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">

                <h2 className="text-xl font-bold text-center text-blue-600">
                    Login to Your Account
                </h2>

                {/* Errors */}
                {errors.length > 0 && (
                    <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                        <ul className="list-disc list-inside">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label For="email" className="block mb-1 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label For="password" className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-blue-500" />
                            Remember me
                        </label>

                        <a href="#" className="text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition duration-200"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">Register</a>
                    </p>

                </form>
            </div>
        </section>
    );
}