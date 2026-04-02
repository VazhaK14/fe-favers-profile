"use client";

import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import { Settings, X, Save, AlertCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { authClient, type ActiveUser } from "../../../../lib/auth-client";
import { themeSchema, type ThemePayload } from "../../../../lib/api/theme";

export function ThemeSettings({ currentTheme }: { currentTheme: ThemePayload | null }) {
  const { data: session } = authClient.useSession();
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [theme, setTheme] = useState<ThemePayload>({
    fontFamily: currentTheme?.fontFamily || "Geist Variable",
    primaryColor: currentTheme?.primaryColor || "#000000",
    backgroundColor: currentTheme?.backgroundColor || "#ffffff",
    cardColor: currentTheme?.cardColor || "#ffffff",
    accentColor: currentTheme?.accentColor || "#f3f4f6",
    textColor: currentTheme?.textColor || "#000000",
  });

  // Tipe data sudah aman tanpa 'any'
  const userRole = (session?.user as ActiveUser)?.role;
  
  // Deteksi sukses update dan otomatis tutup modal
  useEffect(() => {
    if (fetcher.data && (fetcher.data as any).success) {
      setIsOpen(false);
    }
  }, [fetcher.data]);

  if (userRole !== "MEMBER") return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTheme((prev) => ({ ...prev, [name]: value }));

    const fieldSchema = themeSchema.shape[name as keyof typeof themeSchema.shape];
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      setErrors((prev) => ({ ...prev, [name]: result.error.issues[0]?.message || "Invalid" }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    const result = themeSchema.safeParse(theme);
    
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = {};
      Object.entries(fieldErrors).forEach(([key, val]) => {
        if (val && val.length > 0) formattedErrors[key] = val[0];
      });
      setErrors(formattedErrors);
      return;
    }

    // Eksekusi action React Router. Data dikirim ke server secara aman.
    fetcher.submit(result.data, { 
      method: "PATCH", 
      encType: "application/json" 
    });
  };

  const isLoading = fetcher.state !== "idle";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="rounded-full shadow-lg h-14 w-14">
          <Settings className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <div className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl p-6 w-80 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Theme Settings</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Font Family</label>
              <select
                name="fontFamily"
                value={theme.fontFamily}
                onChange={handleChange}
                className="border border-border rounded-md p-2 text-sm bg-transparent"
              >
                <option value="Geist Variable">Geist Variable</option>
                <option value="Inter">Inter</option>
                <option value="Serif">Serif</option>
                <option value="Mono">Mono</option>
              </select>
            </div>

            {[
              { label: "Background", name: "backgroundColor" },
              { label: "Text Color", name: "textColor" },
              { label: "Card Color", name: "cardColor" },
              { label: "Primary", name: "primaryColor" },
              { label: "Accent", name: "accentColor" },
            ].map((item) => (
              <div key={item.name} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">{item.label}</label>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name={item.name}
                      value={theme[item.name as keyof ThemePayload]}
                      onChange={handleChange}
                      maxLength={7}
                      placeholder="#000000"
                      className={`w-20 border rounded-md p-1 text-xs uppercase font-mono focus:outline-none focus:ring-2 ${
                        errors[item.name] 
                          ? "border-red-500 focus:ring-red-500" 
                          : "border-border focus:ring-ring"
                      }`}
                    />
                    <input
                      type="color"
                      name={item.name}
                      value={errors[item.name] ? "#000000" : theme[item.name as keyof ThemePayload]}
                      onChange={handleChange}
                      className="h-7 w-7 cursor-pointer rounded-md border-0 p-0 bg-transparent shrink-0"
                    />
                  </div>
                </div>
                {errors[item.name] && (
                  <span className="text-xs text-red-500 flex items-center justify-end">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors[item.name]}
                  </span>
                )}
              </div>
            ))}
          </div>

          <Button 
            onClick={handleSave} 
            disabled={isLoading || Object.keys(errors).length > 0} 
            className="w-full mt-4"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Configuration"}
          </Button>
        </div>
      )}
    </div>
  );
}