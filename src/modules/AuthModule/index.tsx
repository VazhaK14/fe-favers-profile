import { authClient } from "lib/auth-client";
import { Button } from "~/components/ui/button";
import { User } from "lucide-react";

export default function AuthModule() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-slate-50">
      <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col items-center gap-6 max-w-md w-full">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">FAVERS</h1>
        <p className="text-slate-500 text-center">Login to access your profile and join our community.</p>
        <Button onClick={handleGoogleLogin} variant="outline" size="lg" className="w-full flex items-center justify-center gap-2">
          <User className="w-5 h-5" />
          Login with Google
        </Button>
      </div>
    </div>
  );
}
