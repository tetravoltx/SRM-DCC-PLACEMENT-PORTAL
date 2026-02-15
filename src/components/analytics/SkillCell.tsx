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
    CU: "bg-secondary text-foreground border-border shadow-sm",
    AP: "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-800 shadow-sm shadow-blue-500/5",
    AN: "bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-800 shadow-sm shadow-purple-500/5",
    EV: "bg-amber-500/10 text-amber-600 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-800 shadow-sm shadow-amber-500/5",
    CR: "bg-rose-500/10 text-rose-600 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-800 shadow-sm shadow-rose-500/5",
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
            <td className="px-4 py-4 text-center border-r border-border bg-muted/5 transition-colors">
                <span className="text-xs text-muted-foreground/30">—</span>
            </td>
        );
    }

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <td className="px-4 py-4 border-r border-border cursor-pointer hover:bg-primary/[0.02] transition-colors relative group/cell">
                        <div className="flex flex-col items-center gap-2">
                            <span
                                className={cn(
                                    "px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-transform group-hover/cell:scale-110",
                                    bloomColors[skill.bloomLevel]
                                )}
                            >
                                {skill.bloomLevel}
                            </span>
                            <div className="text-[10px] text-muted-foreground font-bold tracking-tight uppercase opacity-70 group-hover/cell:opacity-100 transition-opacity">
                                L{skill.level} • P{skill.proficiency}
                            </div>
                        </div>
                    </td>
                </TooltipTrigger>
                <TooltipContent side="top" className="p-0 border-none bg-transparent shadow-none" sideOffset={10}>
                    <div className="w-72 bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-elevated overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-primary/5 p-4 border-b border-border">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-sm text-foreground">{skill.name}</h4>
                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                                    {companyName}
                                </span>
                            </div>
                            <p className="text-[10px] font-medium text-muted-foreground">Standard Proficiency Expectation</p>
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Bloom Level</span>
                                    <div className="flex items-center gap-2">
                                        <span className={cn("h-2 w-2 rounded-full", bloomColors[skill.bloomLevel].split(' ')[0])} />
                                        <span className="text-xs font-bold text-foreground">{skill.bloomLevel}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Proficiency</span>
                                    <p className="text-xs font-bold text-foreground">{skill.proficiency}/10</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Topics Covered</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {skill.topics.map((topic, idx) => (
                                        <span key={idx} className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-semibold text-foreground border border-border">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-muted/30 p-3 text-center">
                            <p className="text-[10px] italic text-muted-foreground">
                                {bloomLabels[skill.bloomLevel]} phase requirements
                            </p>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default SkillCell;
