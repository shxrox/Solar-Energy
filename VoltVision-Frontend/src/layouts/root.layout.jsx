// import { Outlet } from "react-router";

// export const RootLayout = () => {
//   return (
//     <>
//       <Outlet />
//     </>
//   );
// };

// export default RootLayout;


import { useEffect } from "react";
import { Outlet } from "react-router";
import { useThemeStore } from "../lib/constants/useThemeStore"; // Import your store

export default function RootLayout() {
  const { theme } = useThemeStore();

  // ✅ This effect applies the theme to the <html> tag
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Outlet />
    </main>
  );
}