import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleLogin = async (data) => {
    setError("");
    setLoading(true);
    try {
      await authService.login(data); // creates session
      const currentUser = await authService.getCurrentUser(); // get user details
      if (currentUser) {
        dispatch(authLogin(currentUser));
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F3] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="flex justify-center mb-6">
          <Logo width="80px" />
        </div>

        <h2 className="text-center text-3xl font-extrabold text-[#0A0908] mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-4 text-sm">
          Sign in to continue to your account
        </p>

        <p className="text-center text-sm mb-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#0A0908] font-medium hover:underline">
            Sign up
          </Link>
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg p-2 mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          <Button
            type="submit"
            className={`w-full bg-[#0A0908] text-white hover:bg-gray-800 transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
