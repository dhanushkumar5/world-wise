import { useEffect } from "react";
import { useAuth } from "../context/LogAuthContext"
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

ProtectRoute.propTypes={
    children : PropTypes.element,
}

export default function ProtectRoute({children}) {
    const {isAuthenticated}=useAuth();
    const navigate = useNavigate();
    useEffect(function(){
        if(!isAuthenticated) navigate("/");
    },[isAuthenticated,navigate])

    return isAuthenticated? children: null;
}
