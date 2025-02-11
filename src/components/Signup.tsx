import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createAccount, userLogin } from "../store/Slices/authSlic";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skeleton/loginSkeleton";
import GetImagePreview from "./GetImagePreview";
import { AppDispatch, RootState } from "../store/store";
import { motion } from "framer-motion";

// Define Form Data Types
interface SignUpForm {
    username: string;
    email: string;
    fullName: string;
    password: string;
    avatar: File | null;
    coverImage: File | null;
}

const SignUp: React.FC = () => {
    const { handleSubmit, register, control, formState: { errors } } = useForm<SignUpForm>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.auth?.loading);

    const submit = async (data: SignUpForm) => {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("fullName", data.fullName);
        formData.append("password", data.password);
        if (data.avatar) formData.append("avatar", data.avatar);
        if (data.coverImage) formData.append("coverImage", data.coverImage);

        const response = await dispatch(createAccount(formData));
        if (response?.payload?.success) {
            const { username, password } = data;
            const loginResult = await dispatch(userLogin({ username, password }));

            navigate(loginResult?.type === "login/fulfilled" ? "/terms&conditions" : "/login");
        }
    };

    if (loading) return <LoginSkeleton />;

    return (
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-[#1e1e2e] to-[#282a36] py-7">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl p-8 rounded-2xl text-white"
            >
                <div className="flex flex-col items-center space-y-3">
                    <Logo />
                    <h2 className="text-2xl font-bold">Create an Account</h2>
                    <p className="text-sm text-gray-300">Sign up to get started with our platform</p>
                </div>

                <form onSubmit={handleSubmit(submit)} className="w-full mt-6 space-y-5">
                    {/* Cover & Avatar Image */}
                    <div className="relative w-full h-28 bg-[#222222] rounded-lg overflow-hidden">
                        <GetImagePreview
                            name="coverImage"
                            control={control}
                            className="w-full h-28 object-cover"
                            cameraIcon
                        />
                        <span className="absolute right-2 bottom-2 text-xs text-gray-400">Cover Image</span>
                        <div className="absolute left-2 bottom-2">
                            <GetImagePreview
                                name="avatar"
                                control={control}
                                className="w-20 h-20 rounded-full border-2 object-cover"
                                cameraIcon
                                cameraSize={20}
                            />
                        </div>
                    </div>
                    {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}

                    {/* Form Inputs */}
                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter username"
                        {...register("username", { required: "Username is required" })}
                        className="h-12 px-4 rounded-md border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        {...register("email", { required: "Email is required" })}
                        className="h-12 px-4 rounded-md border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter full name"
                        {...register("fullName", { required: "Full name is required" })}
                        className="h-12 px-4 rounded-md border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        {...register("password", { required: "Password is required" })}
                        className="h-12 px-4 rounded-md border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    {/* Signup Button */}
                    <Button
                        type="submit"
                        bgColor="bg-purple-500"
                        className="w-full py-3 text-lg rounded-lg hover:bg-purple-600 transition-all"
                    >
                        Signup
                    </Button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-purple-400 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default SignUp;
