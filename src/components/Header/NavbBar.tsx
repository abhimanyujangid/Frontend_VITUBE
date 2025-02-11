import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Button, Logo, SearchForSmallScreen } from "../index";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCloseCircleOutline, BiLike, CiSearch, HiOutlineVideoCamera, SlMenu } from "../icons";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/Slices/authSlic";
import { RootState, AppDispatch } from "../../store/store";

const Navbar: React.FC = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const username = useSelector((state: RootState) => state.auth?.userData?.username);
    const profileImg = useSelector((state: RootState) => state.auth.userData?.avatar?.url);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const logout = async () => {
        await dispatch(userLogout());
        navigate("/");
    };

    const sidePanelItems = [
        { icon: <BiLike size={25} />, title: "Liked Videos", url: "/liked-videos" },
        { icon: <HiOutlineVideoCamera size={25} />, title: "My Content", url: `/channel/${username}` },
    ];

    return (
        <>
            <nav className="w-full bg-gray-900 flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50">
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <Logo />
                </div>

                <div className="w-full sm:w-1/3 hidden sm:block">
                    <Search />
                </div>

                <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
                    <motion.div whileTap={{ scale: 0.9 }}>
                        <CiSearch size={30} fontWeight={"bold"} onClick={() => setOpenSearch((prev) => !prev)} />
                    </motion.div>
                </div>

                    {openSearch && (
                        <div>
                            <SearchForSmallScreen open={openSearch} setOpenSearch={setOpenSearch} />
                        </div>
                    )}

                {authStatus ? (
                    <motion.img
                        src={profileImg}
                        alt="profileImg"
                        className="rounded-full w-10 h-10 object-cover sm:block hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                ) : (
                    <div className="space-x-2 sm:block hidden">
                        <Link to={"/login"}>
                            <Button className="bg-[#222222] border hover:bg-black border-slate-500 sm:px-4 sm:py-2 p-2">Login</Button>
                        </Link>
                        <Link to={"/signup"}>
                            <Button className="font-semibold border hover:bg-[#222222] border-slate-500 sm:px-4 sm:py-2">Sign up</Button>
                        </Link>
                    </div>
                )}

                <motion.div whileTap={{ scale: 0.9 }} className="sm:hidden block">
                    <SlMenu size={24} onClick={() => setToggleMenu((prev) => !prev)} color="white"/>
                </motion.div>
                <AnimatePresence>
                    {toggleMenu && (
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            className="fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-gray-900 sm:hidden rounded-lg outline-none"
                        >
                            <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
                                <Logo />
                                <motion.div whileTap={{ scale: 0.8 }}>
                                    <IoCloseCircleOutline size={35} onClick={() => setToggleMenu(false)} />
                                </motion.div>
                            </div>

                            <div className="flex flex-col justify-between h-full py-5 px-3">
                                <motion.div className="flex flex-col gap-5">
                                    {sidePanelItems.map((item) => (
                                        <NavLink
                                            to={item.url}
                                            key={item.title}
                                            onClick={() => setToggleMenu(false)}
                                            className={({ isActive }) => (isActive ? "bg-purple-500" : "")}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-purple-500"
                                            >
                                                <div>{item.icon}</div>
                                                <span className="text-lg">{item.title}</span>
                                            </motion.div>
                                        </NavLink>
                                    ))}
                                </motion.div>

                                {!authStatus ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex flex-col space-y-5 mb-3"
                                    >
                                        <Link to={"/login"}>
                                            <Button className="w-full bg-[#222222] border hover:bg-white hover:text-black border-slate-500 py-1 px-3">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to={"/signup"}>
                                            <Button className="w-full font-semibold border border-slate-500 hover:bg-white hover:text-black py-1 px-3">
                                                Sign up
                                            </Button>
                                        </Link>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-slate-600"
                                        onClick={() => logout()}
                                    >
                                        <IoMdLogOut size={25} />
                                        <span className="text-base">Logout</span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
