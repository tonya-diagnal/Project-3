import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute2 = (props: PropsWithChildren) => {
    const isSignedIn = localStorage.getItem("isLoggedIn") == "true";
    if (!isSignedIn) {
        return <Navigate to="/login" />;
    }
    return props.children;
};

export default ProtectedRoute2;
