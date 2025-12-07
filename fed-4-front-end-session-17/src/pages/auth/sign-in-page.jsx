import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <SignIn />
    </main>
  );
};

export default SignInPage;
