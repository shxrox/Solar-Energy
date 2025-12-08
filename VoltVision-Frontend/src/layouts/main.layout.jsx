import Footer from "@/components/Navigation/Footer";
import Navigation from "@/components/Navigation/Navigation";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};
