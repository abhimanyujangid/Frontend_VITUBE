import {
    BiHistory,
    BiLike,
    CiSettings,
    HiOutlineVideoCamera,
    IoFolderOutline,
    RiHome6Line,
    TbUserCheck,
} from "../icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { userLogout } from "../../store/Slices/authSlic";
import { RootState, AppDispatch } from "../../store/store";

function SideBar() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const username = useSelector((state: RootState) => state.auth?.userData?.username);

    const sidebarItems = [
        { icon: <RiHome6Line size={25} />, title: "Home", url: "/" },
        { icon: <BiLike size={25} />, title: "Liked Videos", url: "/liked-videos" },
        { icon: <BiHistory size={25} />, title: "History", url: "/history" },
        { icon: <HiOutlineVideoCamera size={25} />, title: "My Content", url: `/channel/${username}` },
        { icon: <IoFolderOutline size={25} />, title: "Collections", url: "/collections" },
        { icon: <TbUserCheck size={25} />, title: "Subscriptions", url: "/subscriptions" },
    ];

    const logout = async () => {
        await dispatch(userLogout());
        navigate("/");
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden sm:flex flex-col bg-gray-900 text-white w-64 h-screen p-4 border-r border-gray-700">
                <nav className="space-y-2">
                    {sidebarItems.map((item) => (
                        <NavLink
                            to={item.url}
                            key={item.title}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-600 ${isActive ? "bg-purple-700" : ""}`
                            }
                        >
                            {item.icon}
                            <span className="text-lg">{item.title}</span>
                        </NavLink>
                    ))}
                </nav>
                
                <div className="mt-auto space-y-2">
                    {username && (
                        <button 
                            className="flex items-center gap-3 w-full px-4 py-2 text-left rounded-lg transition-all duration-300 hover:bg-red-600"
                            onClick={logout}
                        >
                            <IoMdLogOut size={25} />
                            <span className="text-lg">Logout</span>
                        </button>
                    )}
                    <NavLink
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700"
                    >
                        <CiSettings size={25} />
                        <span className="text-lg">Settings</span>
                    </NavLink>
                </div>
            </div>
            
            {/* Mobile Bottom Navigation */}
            <div className="sm:hidden fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around items-center py-3 border-t border-gray-700">
                {sidebarItems.slice(0, 4).map((item) => (
                    <NavLink
                        to={item.url}
                        key={item.title}
                        className={({ isActive }) => `flex flex-col items-center gap-1 text-sm transition-all duration-300 ${isActive ? "text-purple-400" : "text-gray-300"}`}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default SideBar;
