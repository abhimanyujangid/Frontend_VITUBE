import Navbar from "../components/Header/NavbBar";
import SideBar from "../components/Header/SideBar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <Navbar />
            <div className="sm:flex flex-none">
                <div className="">
                    
                    <SideBar />
                </div>
                <div className="sm:flex-1">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
