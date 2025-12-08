// import { Link } from "react-router";
// import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
// import { Button } from "@/components/ui/button";


// const Navigation = () => {
 

//   return (
//     <nav className={"px-12 py-6 flex justify-between items-center"}>
//       <Link to="/" className={"flex items-center gap-3"}>
//         <div
//           className={
//             "w-10 h-10 rounded-full bg-lime-400 flex justify-center items-center"
//           }
//         >

//           <img src="../public/assets/logo/logo.png" alt="logo" />
          
//         </div>
//         <span className="font-[Inter] text-xl font-semibold">VoltVision</span>
//       </Link>

//       <div className={"flex items-center gap-12"}>
//         <SignedIn>
//           <Link to="/dashboard" className={"flex items-center gap-3 px-3 py-2"}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-chart-column-icon lucide-chart-column logo w-4 h-4 block"
//             >
//               <path d="M3 3v16a2 2 0 0 0 2 2h16" />
//               <path d="M18 17V9" />
//               <path d="M13 17V5" />
//               <path d="M8 17v-3" />
//             </svg>
//             <span className="font-[Inter] text-sm font-medium">Dashboard</span>
//           </Link>
//         </SignedIn>
//         <div className={"flex items-center gap-2"}>
//           <SignedOut>
//             <Button asChild>
//               <Link
//                 to="/sign-in"
//                 className={"flex items-center gap-3 px-3 py-2"}
//               >
//                 Sign In
//               </Link>
//             </Button>
//             <Button asChild variant={"outline"}>
//               <Link
//                 to="/sign-up"
//                 className={"flex items-center gap-3 px-3 py-2"}
//               >
//                 Sign Up
//               </Link>
//             </Button>
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;



import { Link } from "react-router"; // or "react-router-dom" depending on your version
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

// ✅ FIX: Import from separate files in your constants folder
import { THEMES } from "@/lib/constants/theme";
import { useThemeStore } from "@/lib/constants/useThemeStore";

const Navigation = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    // bg-base-100 and text-base-content enable the DaisyUI theme colors
    <nav className="px-12 py-6 flex justify-between items-center bg-base-100 text-base-content transition-colors duration-200 border-b border-base-200">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-lime-400 flex justify-center items-center overflow-hidden">
          {/* Ensure this image exists in your /public folder */}
          <img src="/assets/logo/logo.png" alt="logo" className="w-full h-full object-cover" />
        </div>
        <span className="font-[Inter] text-xl font-semibold">VoltVision</span>
      </Link>

      <div className="flex items-center gap-6">
        
        {/* --- THEME CHANGER DROPDOWN --- */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Palette className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[50] menu p-2 shadow bg-base-200 rounded-box w-52 max-h-96 overflow-y-auto"
          >
            {THEMES.map((t) => (
              <li key={t}>
                <button
                  onClick={() => setTheme(t)}
                  className={theme === t ? "active capitalize" : "capitalize"}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* ----------------------------- */}

        <SignedIn>
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 hover:bg-base-200 rounded-md transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chart-column w-4 h-4"
            >
              <path d="M3 3v16a2 2 0 0 0 2 2h16" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
            <span className="font-[Inter] text-sm font-medium">Dashboard</span>
          </Link>
        </SignedIn>

        <div className="flex items-center gap-2">
          <SignedOut>
            <Button asChild variant="ghost">
              <Link to="/sign-in" className="flex items-center gap-3 px-3 py-2">
                Sign In
              </Link>
            </Button>
            <Button asChild variant="default">
              <Link to="/sign-up" className="flex items-center gap-3 px-3 py-2">
                Sign Up
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;