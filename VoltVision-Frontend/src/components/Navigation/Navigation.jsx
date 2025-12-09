
import { useState } from "react";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Palette, LayoutDashboard, Menu, X, Book, Phone } from "lucide-react"; // Added Info, Phone
import { THEMES } from "@/lib/constants/theme";
import { useThemeStore } from "@/lib/constants/useThemeStore";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Helper for Public Links to keep code clean
  const PublicLinks = ({ mobile = false }) => (
    <>
      <Link
        to="/our-story"
        onClick={() => mobile && setIsMobileMenuOpen(false)}
        className={`flex items-center  gap-2 text-sm font-medium  transition-colors ${mobile ? "px-3 py-2 hover:bg-base-200 rounded-md" : ""}`}
      >
        <Book className="h-4 w-4" />
        Our Story
      </Link>
      <Link
        to="/contact-us"
        onClick={() => mobile && setIsMobileMenuOpen(false)}
        className={`flex items-center  gap-2 text-sm font-medium transition-colors ${mobile ? "px-3 py-2 hover:bg-base-200 rounded-md" : ""}`}
      >
        <Phone className="h-4 w-4" />
        Contact Us
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-base-200 bg-base-100/95 backdrop-blur supports-[backdrop-filter]:bg-base-100/60 text-base-content transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* --- LOGO SECTION --- */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-lime-400 overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200">
              <img
                src="/assets/logo/logo.png"
                alt="VoltVision Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-[Inter] text-lg font-bold tracking-tight">
              VoltVision
            </span>
          </Link>

          {/* --- DESKTOP NAVIGATION (Hidden on Mobile) --- */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* 1. Public Pages (Visible to Everyone) */}
            <PublicLinks />

            {/* 2. Theme Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
                <Palette className="h-5 w-5" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[100] menu p-2 shadow-lg bg-base-200 rounded-box w-52 max-h-96 overflow-y-auto border border-base-300"
              >
                <li className="menu-title px-4 py-2 text-xs uppercase opacity-50">Select Theme</li>
                {THEMES.map((t) => (
                  <li key={t}>
                    <button
                      onClick={() => setTheme(t)}
                      className={`capitalize flex justify-between ${theme === t ? "active font-bold" : ""}`}
                    >
                      {t}
                      {theme === t && <span className="text-xs">✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Dashboard Link (Protected) */}
            <SignedIn>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm font-medium   transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </SignedIn>

            {/* 4. Auth Buttons */}
            <div className="flex items-center gap-2 border-l border-base-300 pl-6">
              <SignedOut>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/sign-up">Get Started</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9 ring-2 ring-base-200"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>

          {/* --- MOBILE MENU TOGGLE (Visible on Mobile) --- */}
          <div className="flex md:hidden items-center gap-4">
             {/* Mobile Theme Toggle */}
             <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
                <Palette className="h-5 w-5" />
              </div>
              <ul tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow-lg bg-base-200 rounded-box w-48 max-h-64 overflow-y-auto">
                {THEMES.map((t) => (
                  <li key={t}><button onClick={() => setTheme(t)} className="capitalize">{t}</button></li>
                ))}
              </ul>
            </div>

            <button onClick={toggleMenu} className="btn btn-ghost btn-circle btn-sm">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-base-200 bg-base-100 px-4 py-6 shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-4">
            
            {/* Public Links in Mobile */}
            <div className="flex flex-col space-y-2 border-b border-base-200 pb-4">
                <PublicLinks mobile={true} />
            </div>

            <SignedIn>
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-base-200"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium">Account</span>
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <div className="grid text-black grid-cols-2 gap-4 pt-2">
                <Button asChild variant="outline" onClick={() => setIsMobileMenuOpen(false)}>
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}