import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../store/user/userSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props: PropsWithChildren) => {
    const isSignedIn = useSelector(isLoggedIn);
    if (!isSignedIn) {
        return <Navigate to="/login" />;
    }
    return props.children;
};

export default ProtectedRoute;
