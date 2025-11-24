import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useauth";
import { useEffect } from "react";

export default function PublicRoute() {
  const { user, loading, loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
