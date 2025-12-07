import { Outlet } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

export default function AuthorizedLayout() {
  const { user } = useUser();

  if (user?.publicMetadata.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
