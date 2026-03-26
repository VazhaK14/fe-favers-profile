import { Button } from "~/components/ui/button";
import { User } from "lucide-react";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b shadow-sm sticky top-0 z-50 bg-white/60 backdrop-blur-md border-white/20">
      <div className="flex items-center">
        <span className="text-xl font-bold tracking-tight text-slate-900">
          FAVERS
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => console.log("Login clicked")}>
          <User className="w-4 h-4 mr-2" />
          Login with Google
        </Button>
      </div>
    </nav>
  );
}
