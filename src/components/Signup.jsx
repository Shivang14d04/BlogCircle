import React, { useState } from "react";
import authService from "../appwrite/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getAccount();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2F4F3] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo width="100px" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl font-extrabold text-[#0A0908] mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#0A0908] font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", { required: "Name is required" })}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email must be valid",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            <Button
              type="submit"
              className="w-full bg-[#0A0908] text-white hover:bg-gray-800 transition-colors duration-200"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
