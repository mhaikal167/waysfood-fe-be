import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



export function PrivateRouteUser({auth}) {
  if (auth.user?.role === "partner") {
    return <Navigate to="/partner" />;
  }else if(auth.user?.role !== "customer"){
    return <Navigate to="/" />
  }
  return <Outlet />;
}
export function PublicRoute({auth}) {
    if (auth.user?.role === "partner") {
      return <Navigate to="/partner" />;
    }
    return <Outlet />;
  }

export function PrivateRoutePartner({auth}) {
  if (auth.user?.role !== "partner") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}