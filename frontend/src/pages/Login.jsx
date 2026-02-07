import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/context/auth';

const LoginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

export default function Login() {
    const {loginUser, isLoading } = useAuth();  
    const navigate = useNavigate();

    return (
        <section className="bg-[#CEE1FF] flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-xl font-bold text-blue-600">
                            Login to Your Account
                        </h2>
                    </div>

                    {/* Form */}
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values, { setErrors }) => {
                            try {
                                await loginUser(values);
                                navigate("/admin/dashboard");
                            } catch (error) {
                                // Handle backend validation errors
                                if (error.data?.errors) {
                                    const backendErrors = {};
                                    Object.keys(error.data.errors).forEach((key) => {
                                        backendErrors[key] = error.data.errors[key][0];
                                    });
                                    setErrors(backendErrors);
                                } else {
                                    setErrors({
                                        password: error.data?.message || "Invalid email or password",
                                    });
                                }
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="space-y-5">

                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email && touched.email
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="mt-1 text-sm text-red-600"
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password && touched.password
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="mt-1 text-sm text-red-600"
                                    />
                                </div>

                                {/* Remember me & Forgot password */}
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" className="accent-blue-500" />
                                        Remember me
                                    </label>

                                    <a href="#" className="text-blue-600 hover:underline">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Logging in..." : "Login"}
                                </button>

                                {/* Register Link */}
                                <p className="text-center text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <a href="/register" className="text-blue-600 hover:underline">
                                        Register
                                    </a>
                                </p>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </section>
    );
}