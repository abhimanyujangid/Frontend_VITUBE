import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Input from "./Input";
import Button from "./Button";
import { IoCloseCircleOutline } from "react-icons/io5";

interface SearchForSmallScreenProps {
    open: boolean;
    setOpenSearch: (open: boolean) => void;
}

function SearchForSmallScreen({ open, setOpenSearch }: SearchForSmallScreenProps) {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const search = (data: { query: string }) => {
        const query = data.query;
        navigate(`/search/${query}`);
        setOpenSearch(false);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed bg-gray-900 bg-opacity-90 z-50 inset-0 h-screen w-full flex items-start justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="sm:p-8 p-4 relative w-full"
                        initial={{ y: -30 }}
                        animate={{ y: 0 }}
                        exit={{ y: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute top-5 right-5">
                            <IoCloseCircleOutline size={30} onClick={() => setOpenSearch(false)} color="white" />
                        </div>
                        <form
                            onSubmit={handleSubmit((data) => search(data as { query: string }))}
                            className="flex items-center mt-10"
                        >
                            <Input
                                type="text"
                                placeholder="Search"
                                className="px-4 py-2 border border-gray-300 focus:outline-none"
                                {...register("query", { required: true })}
                            />
                            <Button
                                type="submit"
                                className="px-4 py-2 bg-purple-500 text-white font-semibold hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Search
                            </Button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default SearchForSmallScreen;

