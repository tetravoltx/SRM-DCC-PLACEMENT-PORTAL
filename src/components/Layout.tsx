import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
    showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                {showSidebar && <Sidebar />}
                <main className={`flex-1 ${showSidebar ? "lg:pl-64" : ""}`}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
