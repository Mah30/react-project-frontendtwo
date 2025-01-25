import { useContext } from "react";
import { SessionContext } from "../SessionContext/SessionContext";
import { Navigate } from "react-router-dom";




const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(SessionContext)

    if (!isAuthenticated) {
        return (<Navigate to = '/login' />)
    }

    return (children)
};


export default PrivateRoute