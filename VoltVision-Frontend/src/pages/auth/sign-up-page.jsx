
import { SignUp } from "@clerk/clerk-react";
import { useThemeStore } from "@/lib/constants/useThemeStore"; 
import { Link } from "react-router"; // or react-router-dom

const SignInPage = () => {
  const { theme } = useThemeStore();

  return (
    <div className="flex min-h-screen w-full bg-base-100 text-base-content transition-colors duration-200">
      

      <div className="hidden w-0 flex-1 lg:flex flex-col justify-center items-center bg-base-200 p-12">
        <div className="max-w-lg space-y-6 text-center">
            <h1 className="text-5xl font-bold tracking-tight leading-tight text-base-content">
              Welcome to <br/>
              <span className="">VoltVision</span>
            </h1>
            <p className="text-xl opacity-80 leading-relaxed text-base-content/80">
              Your complete solar energy monitoring solution. Track generation, detect anomalies, and manage billing in one unified platform.
            </p>
            <div className="pt-8 opacity-60">
               <p className="text-sm font-medium tracking-widest uppercase text-base-content/60">Trusted by Homeowners</p>
            </div>
        </div>
      </div>


      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-base-100">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
      
          <div className="mb-10 text-center lg:text-left">
            <Link to="/" className="flex items-center justify-center lg:justify-start gap-3 mb-6">
             

            </Link>
            <h2 className="text-3xl font-bold tracking-tight">
              Sign Up
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access your dashboard.
            </p>
          </div>

    

           <SignUp 
        appearance={{
          variables: { 
  
            colorPrimary: 'hsl(var(--p))', 
          }
        }}
      />
        </div>
      </div>

    </div>
  );
};

export default SignInPage;