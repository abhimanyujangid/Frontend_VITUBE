import { useEffect, ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopup";
import { RootState } from "../store/store";

interface AuthLayoutProps {
    children: ReactNode;
    authentication: boolean;
}

function AuthLayout({ children, authentication }: AuthLayoutProps) {
    const navigate = useNavigate();
    const authStatus = useSelector((state: RootState) => state.auth.status);

    useEffect(() => {
        if (authentication !== authStatus) {
            navigate("/");
        }
    }, [authStatus, authentication, navigate]);

    if (authentication && authStatus !== authentication) {
        return <LoginPopup />;
    }

    return <>{children}</>;
}

export default AuthLayout;

