import React, { useMemo, useState } from "react";
import { Company, Skill } from "@/data/companies";
import SkillCell from "./SkillCell";
import { Info, Search, X } from "lucide-react";

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
            <div className="flex items-center justify-between gap-4">
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Filter skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <p className="text-sm text-muted-foreground">
                        Found {filteredMatrix.length} skill{filteredMatrix.length !== 1 ? 's' : ''}
                    </p>
                )}
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-muted/50 border-b-2 border-border">
                                <th className="sticky left-0 z-20 bg-muted/50 px-6 py-4 text-left font-bold text-sm text-foreground border-r-2 border-border min-w-[200px]">
                                    Skill Area
                                </th>
                                {selectedCompanies.map((company) => (
                                    <th
                                        key={company.id}
                                        className="px-4 py-4 text-center font-bold text-sm text-foreground border-r border-border/50 min-w-[140px]"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center overflow-hidden p-1">
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
                                            <span className="text-xs font-semibold">{company.name}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            <tr className="bg-muted/30 border-b border-border text-[10px] text-muted-foreground uppercase tracking-wider">
                                <td className="sticky left-0 z-20 bg-muted/30 px-6 py-2 border-r-2 border-border"></td>
                                {selectedCompanies.map((company) => (
                                    <td
                                        key={company.id}
                                        className="px-4 py-2 text-center border-r border-border/50 font-semibold"
                                    >
                                        Bloom | Level | Prof
                                    </td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMatrix.length > 0 ? (
                                filteredMatrix.map((row, idx) => (
                                    <tr
                                        key={row.skillName}
                                        className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}
                                    >
                                        <td className="sticky left-0 z-10 px-6 py-4 font-semibold text-sm text-foreground border-r-2 border-border bg-inherit">
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
