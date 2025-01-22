import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useOrganizer from "../hooks/useOrganizer";

const OrganizerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isOrganizer, isLoading] = useOrganizer();
    const location = useLocation();

    if (loading || isLoading) {
        return <progress className="progress w-56"></progress>; // Show loading spinner
    }

    if (user && isOrganizer) {
        return children; // Allow access to organizer routes
    }

    return <Navigate to="/dashboard/participant-profile" state={{ from: location }} replace />;
};

export default OrganizerRoute;
