import React from "react";
import { Company, Skill } from "@/data/companies";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillCellProps {
    skill: Skill | null;
    companyName: string;
}

const bloomColors: Record<string, string> = {
    CU: "bg-secondary text-foreground border-border",
    AP: "bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
    AN: "bg-purple-100 text-purple-900 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
    EV: "bg-orange-100 text-orange-900 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800",
    CR: "bg-red-100 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
};

const bloomLabels: Record<string, string> = {
    CU: "Conceptual Understanding",
    AP: "Application",
    AN: "Analysis",
    EV: "Evaluation",
    CR: "Creation",
};

const SkillCell: React.FC<SkillCellProps> = ({ skill, companyName }) => {
    if (!skill) {
        return (
            <td className="px-4 py-3 text-center border-r border-border/50 bg-muted/20">
                <span className="text-xs text-muted-foreground">—</span>
            </td>
        );
    }

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <td className="px-4 py-3 border-r border-border/50 cursor-help hover:bg-muted/30 transition-colors">
                        <div className="flex flex-col items-center gap-1.5">
                            <span
                                className={cn(
                                    "px-2 py-0.5 rounded text-[10px] font-bold border",
                                    bloomColors[skill.bloomLevel]
                                )}
                            >
                                {skill.bloomLevel}
                            </span>
                            <div className="text-xs text-muted-foreground font-medium">
                                L{skill.level} | P{skill.proficiency}
                            </div>
                        </div>
                    </td>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                    <div className="space-y-2">
                        <div className="font-bold text-sm">{skill.name} ({companyName})</div>
                        <div className="text-xs space-y-1">
                            <div>
                                <span className="font-semibold">Bloom Level:</span>{" "}
                                {skill.bloomLevel} ({bloomLabels[skill.bloomLevel]})
                            </div>
                            <div>
                                <span className="font-semibold">Proficiency:</span> {skill.proficiency}/10
                            </div>
                        </div>
                        <div className="pt-2 border-t border-border">
                            <div className="font-semibold text-xs mb-1">Topics Covered:</div>
                            <ul className="text-xs space-y-0.5 list-disc list-inside">
                                {skill.topics.map((topic, idx) => (
                                    <li key={idx}>{topic}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default SkillCell;
