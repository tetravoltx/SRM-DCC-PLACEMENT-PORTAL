import { Home, Building, TrendingUp, UserCheck, Sparkles, GraduationCap, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", icon: Home, path: "/" },
        { name: "Companies", icon: Building, path: "/?view=companies" },
        { name: "Skill Set Analytics", icon: TrendingUp, path: "/analytics" },
        { name: "Hiring Rounds", icon: UserCheck, path: "/rounds" },
        { name: "Insights", icon: Sparkles, path: "/insights" },
    ];

    return (
        <aside className="fixed left-0 top-[73px] bottom-0 w-64 border-r border-border bg-card/50 backdrop-blur-sm hidden lg:flex flex-col py-6 px-4 z-20">
            <nav className="space-y-1">
                {navItems.map((item) => {
                    const currentPath = location.pathname + location.search;
                    const isActive = item.name === "Companies"
                        ? (currentPath.includes("view=companies") || location.pathname.startsWith("/company/"))
                        : (item.path === "/" ? (location.pathname === "/" && location.search === "") : currentPath.startsWith(item.path));

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-secondary text-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn(
                                "h-4 w-4 transition-colors",
                                isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                            )} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-border">
                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all group">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-border">
                        <GraduationCap className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col items-start text-left">
                        <span className="text-sm font-medium text-foreground">Student Name</span>
                        <span className="text-xs text-muted-foreground">student@srm.edu.in</span>
                    </div>
                    <LogOut className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
