import React, { useMemo, useState } from "react";
import { Company, Skill } from "@/data/companies";
import SkillCell from "./SkillCell";
import { Info, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SkillComparisonTableProps {
    selectedCompanies: Company[];
}

interface SkillRow {
    skillName: string;
    companies: {
        companyId: string;
        companyName: string;
        skill: Skill | null;
    }[];
}

const SkillComparisonTable: React.FC<SkillComparisonTableProps> = ({
    selectedCompanies,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [showLeftFade, setShowLeftFade] = React.useState(false);
    const [showRightFade, setShowRightFade] = React.useState(true);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setShowLeftFade(scrollLeft > 10);
            setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = direction === "left" ? -300 : 300;
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    React.useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            handleScroll();
            container.addEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleScroll);
            return () => {
                container.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", handleScroll);
            };
        }
    }, [selectedCompanies]);

    const skillMatrix = useMemo(() => {
        // Collect all unique skills across selected companies
        const allSkills = Array.from(
            new Set(
                selectedCompanies
                    .flatMap((c) => c.skills || [])
                    .map((s) => s.name)
            )
        ).sort();

        // Build matrix: skills × companies
        const matrix: SkillRow[] = allSkills.map((skillName) => ({
            skillName,
            companies: selectedCompanies.map((company) => {
                const skill = company.skills?.find((s) => s.name === skillName);
                return {
                    companyId: company.id,
                    companyName: company.name,
                    skill: skill || null,
                };
            }),
        }));

        return matrix;
    }, [selectedCompanies]);

    const filteredMatrix = useMemo(() => {
        if (!searchQuery) return skillMatrix;
        return skillMatrix.filter((row) =>
            row.skillName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [skillMatrix, searchQuery]);

    if (skillMatrix.length === 0) {
        return (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Skills Data Available
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    The selected companies don't have detailed skill requirements data yet.
                    Try selecting companies like Google that have comprehensive skill matrices.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/40 p-4 rounded-2xl border border-border/50">
                <div className="relative w-full max-w-xs group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Filter skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 rounded-full border border-border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 hover:bg-muted rounded-full transition-all"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <p className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border">
                        Showing {filteredMatrix.length} of {skillMatrix.length} skills
                    </p>
                )}
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft relative group/table">
                {/* Scroll Buttons & Fades */}
                <div className={cn(
                    "absolute left-[200px] top-0 bottom-0 z-30 flex items-center transition-all duration-500 pointer-events-none",
                    showLeftFade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}>
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-card via-card/95 via-card/50 to-transparent w-20" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scroll("left")}
                        className="h-8 w-8 rounded-full bg-background border border-border shadow-md hover:bg-accent relative z-40 pointer-events-auto ml-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>

                <div className={cn(
                    "absolute right-0 top-0 bottom-0 z-30 flex items-center transition-all duration-500 pointer-events-none",
                    showRightFade ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                )}>
                    <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-card via-card/95 via-card/50 to-transparent w-20" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => scroll("right")}
                        className="h-8 w-8 rounded-full bg-background border border-border shadow-md hover:bg-accent relative z-40 pointer-events-auto mr-2"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto scrollbar-hide"
                >
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-muted/30 border-b border-border">
                                <th className="sticky left-0 z-20 bg-card px-6 py-6 text-left font-bold text-xs uppercase tracking-widest text-muted-foreground border-r border-border min-w-[200px]">
                                    Skill Area
                                </th>
                                {selectedCompanies.map((company) => (
                                    <th
                                        key={company.id}
                                        className="px-6 py-6 text-center font-bold text-sm text-foreground border-r border-border min-w-[160px]"
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center overflow-hidden p-2 shadow-sm transition-transform hover:scale-110">
                                                <img
                                                    src={company.logo}
                                                    alt={company.name}
                                                    className="h-full w-full object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = "none";
                                                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-xs font-bold text-muted-foreground">${company.name[0]}</span>`;
                                                    }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold tracking-tight">{company.name}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            <tr className="bg-muted/10 border-b border-border text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
                                <td className="sticky left-0 z-20 bg-card px-6 py-2 border-r border-border"></td>
                                {selectedCompanies.map((company) => (
                                    <td
                                        key={company.id}
                                        className="px-4 py-2 text-center border-r border-border"
                                    >
                                        Bloom | Lvl | Prof
                                    </td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMatrix.length > 0 ? (
                                filteredMatrix.map((row, idx) => (
                                    <tr
                                        key={row.skillName}
                                        className="group/row transition-colors hover:bg-secondary/20"
                                    >
                                        <td className="sticky left-0 z-10 px-6 py-4 font-bold text-sm text-foreground border-r border-border bg-card group-hover/row:bg-secondary/10 transition-colors">
                                            {row.skillName}
                                        </td>
                                        {row.companies.map((companyData) => (
                                            <SkillCell
                                                key={companyData.companyId}
                                                skill={companyData.skill}
                                                companyName={companyData.companyName}
                                            />
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={selectedCompanies.length + 1} className="py-12 text-center text-muted-foreground italic">
                                        No skills matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Legend */}
                <div className="border-t border-border bg-muted/30 px-6 py-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                        <span className="font-semibold text-foreground">Bloom's Levels:</span>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-2 py-1 rounded bg-secondary text-foreground border border-border font-medium">
                                CU - Conceptual
                            </span>
                            <span className="px-2 py-1 rounded bg-blue-100 text-blue-900 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 font-medium">
                                AP - Application
                            </span>
                            <span className="px-2 py-1 rounded bg-purple-100 text-purple-900 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800 font-medium">
                                AN - Analysis
                            </span>
                            <span className="px-2 py-1 rounded bg-orange-100 text-orange-900 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800 font-medium">
                                EV - Evaluation
                            </span>
                            <span className="px-2 py-1 rounded bg-red-100 text-red-900 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800 font-medium">
                                CR - Creation
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillComparisonTable;
