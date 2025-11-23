import { Navigate } from "react-router";
import { useAuth } from "../hooks/useauth";
import type { JSX } from "react";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading, loadUser } = useAuth();

  // Load the current user on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
