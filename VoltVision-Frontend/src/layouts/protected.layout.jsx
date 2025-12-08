import { Outlet, Navigate } from "react-router";
import { useUser } from "@clerk/clerk-react";

export default function ProtectedLayout() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
}
