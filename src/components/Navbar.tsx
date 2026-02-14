import { Link } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const x = event.clientX;
    const y = event.clientY;
    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);

    const applyTheme = (newDark: boolean) => {
      setIsDark(newDark);
      if (newDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    const newMode = !isDark;

    // @ts-ignore - View Transitions API might not be in the types yet
    if (!document.startViewTransition) {
      applyTheme(newMode);
      return;
    }

    // @ts-ignore
    document.startViewTransition(() => {
      applyTheme(newMode);
    });
  };

  const handleLogout = () => {
    // Placeholder for logout logic
    console.log("Logging out...");
    window.location.href = "/login"; // Or just home if login not implemented
  };

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30 w-full">
      <div className="mx-auto max-w-full px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img src="/srmlogo.png" alt="SRM Logo" className="h-10 w-auto object-contain" />
          <div className="flex flex-col leading-tight hidden sm:flex">
            <span className="font-semibold text-foreground text-sm">
              Placement Portal
            </span>
            <span className="text-xs text-muted-foreground">
              Directorate of Career Centre
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-10 h-10 hover:bg-secondary transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="h-[1.2rem] w-[1.2rem] text-accent" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] text-primary" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl px-4 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
