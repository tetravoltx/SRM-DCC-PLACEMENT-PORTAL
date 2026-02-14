import { Rocket, Zap, Globe, Cpu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const InnovXSection = () => {
    return (
        <div className="space-y-6">
            {/* Header Widget */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 text-white shadow-card">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
                        <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl font-bold tracking-tight">InnovX</h2>
                </div>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    The hub for next-gen startups & innovation at SRM DCC.
                </p>
                <button className="flex w-full items-center justify-between rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold transition-all hover:bg-white/20">
                    Explore Startups
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Startup Spotlight */}
            <div className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                        <Rocket className="h-4 w-4 text-primary" />
                        Startup Spotlight
                    </h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-tighter">
                        Featured
                    </span>
                </div>

                <div className="space-y-4">
                    <div className="group cursor-pointer rounded-2xl border border-transparent hover:border-border/50 hover:bg-muted/30 p-3 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Globe className="h-4 w-4 text-blue-500" />
                            </div>
                            <p className="font-bold text-sm text-foreground">EcoSphere AI</p>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">
                            Sustainable logistics platform using neural networks for carbon optimization.
                        </p>
                    </div>

                    <div className="group cursor-pointer rounded-2xl border border-transparent hover:border-border/50 hover:bg-muted/30 p-3 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <Cpu className="h-4 w-4 text-emerald-500" />
                            </div>
                            <p className="font-bold text-sm text-foreground">NeuroCore</p>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">
                            Custom ASIC design for ethical AI processing in medical edge devices.
                        </p>
                    </div>
                </div>
            </div>

            {/* Innovation Feed */}
            <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-display font-bold text-foreground mb-5">Innovation Feed</h3>
                <div className="space-y-6">
                    <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:bottom-0 before:w-px before:bg-border">
                        <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Upcoming</p>
                        <p className="font-bold text-xs text-foreground mb-1 leading-tight">Vite-Hack 2026 Registration</p>
                        <p className="text-[10px] text-muted-foreground italic">Starts in 3 days</p>
                    </div>

                    <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:bottom-0 before:w-px before:bg-border">
                        <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-muted-foreground/30 ring-4 ring-background" />
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Announced</p>
                        <p className="font-bold text-xs text-foreground mb-1 leading-tight">Seed Funding for 4 Student Startups</p>
                        <p className="text-[10px] text-muted-foreground italic">DCC Innovation Fund</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnovXSection;
