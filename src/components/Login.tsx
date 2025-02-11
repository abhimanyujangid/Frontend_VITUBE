import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../store/Slices/authSlic";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skeleton/loginSkeleton";
import { AppDispatch, RootState } from "../store/store";
import { motion } from "framer-motion";

// Define form input types
interface LoginFormInputs {
    username: string;
    password: string;
}

function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.auth?.loading);

    // Submit handler with TypeScript
    const submit: SubmitHandler<LoginFormInputs> = async (data) => {
        const isEmail = data.username.includes("@");
        const loginData = isEmail
            ? { email: data.username, password: data.password }
            : data;

        const response = await dispatch(userLogin(loginData));
        if (response?.payload) {
            await dispatch(getCurrentUser());
            navigate("/");
        }
    };

    if (loading) {
        return <LoginSkeleton />;
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-[#1e1e2e] to-[#282a36] p-3">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-6 rounded-2xl text-white"
            >
                <div className="flex flex-col items-center">
                    <Logo />
                    <h2 className="text-2xl font-semibold mt-3">Welcome Back</h2>
                    <p className="text-sm text-gray-300">Log in to continue</p>
                </div>

                <form onSubmit={handleSubmit(submit)} className="space-y-5 mt-5">
                    <div className="relative">
                        <Input
                            label="Username / Email :"
                            type="text"
                            placeholder="example@gmail.com"
                            {...register("username", { required: "Username is required" })}
                        />
                        {errors.username && (
                            <span className="text-red-400 text-sm">{errors.username.message}</span>
                        )}
                    </div>

                    <div className="relative">
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <span className="text-red-400 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            type="submit"
                            bgColor="bg-purple-600"
                            className="w-full py-3 rounded-lg text-lg font-semibold tracking-wide hover:bg-purple-800 transition-all duration-300"
                        >
                            Login
                        </Button>
                    </motion.div>

                    <p className="text-center text-sm text-gray-300">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-purple-400 hover:text-purple-500 transition-all duration-200"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}

export default Login;
