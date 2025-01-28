import { useContext } from "react";
import { SessionContext } from "../SessionContext/SessionContext";
import { Navigate } from "react-router-dom";




const AdminRoute = ({ children }) => {
    const { isAuthenticated, isLoading, tokenPayload } = useContext(SessionContext)

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    if (!isAuthenticated) {
        return (<Navigate to = '/login' />)
    }

    if (!tokenPayload.isAdmin) {
        return <p>Need admin account for this page</p>
    }

    return (children)
};


export default AdminRoute