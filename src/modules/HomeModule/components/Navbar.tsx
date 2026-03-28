import { Button } from "~/components/ui/button";
import { User, LogOut } from "lucide-react";
import { authClient } from "../../../../lib/auth-client";
import { toast } from "sonner";
import { useEffect } from "react";

export function Navbar() {
  // cek status user: isPending (sedang loading) dan session (data user jika sudah login)
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending) {
      const action = sessionStorage.getItem("auth_action");
      if (action === "login" && session) {
        toast.success("Login sukses!");
        sessionStorage.removeItem("auth_action");
      }
    }
  }, [isPending, session]);

  // fungsi memanggil backend untuk login via Google
  const handleLogin = async () => {
    sessionStorage.setItem("auth_action", "login");
    toast.promise(
      authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
      }),
      {
        loading: "Mengarahkan ke halaman login...",
        error: "Gagal login, silakan coba lagi",
      },
    );
  };

  // fungsi untuk menghapus sesi dan refresh halaman
  const handleLogout = async () => {
    sessionStorage.setItem("auth_action", "logout");
    toast.promise(
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => window.location.reload(),
        },
      }),
      {
        loading: "Logging out...",
        error: "Gagal logout, silakan coba lagi",
      },
    );
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b shadow-sm sticky top-0 z-50 bg-white/60 backdrop-blur-md border-white/20">
      <div className="flex items-center">
        <span className="text-xl font-bold tracking-tight text-slate-900">
          FAVERS
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* logika Tampilan: loading -> user profile (sudah login) -> tombol login with google (belum login) */}
        {isPending ? (
          <div className="h-9 w-32 bg-slate-200 animate-pulse rounded-md" />
        ) : session ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-8 h-8 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-5 h-5 text-slate-600" />
              )}

              <span className="text-sm font-medium text-slate-700">
                {session.user.name}
              </span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={handleLogin}>
            <User className="w-4 h-4 mr-2" />
            Login with Google
          </Button>
        )}
      </div>
    </nav>
  );
}
