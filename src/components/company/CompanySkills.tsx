import React, { useState } from "react";
import { Company, Skill } from "@/data/companies";
import { FileCode, ChevronDown, ChevronUp, BookMarked, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanySkillsProps {
    skills?: Skill[];
}

const bloomColors: Record<string, string> = {
    "CU": "bg-secondary text-foreground border-border",
    "AP": "bg-secondary/80 text-foreground border-border",
    "AN": "bg-secondary/60 text-foreground border-border",
    "EV": "bg-primary/10 text-primary border-primary/20",
    "CR": "bg-primary/20 text-primary border-primary/30",
};

const bloomLabels: Record<string, string> = {
    "CU": "Conceptual Understanding",
    "AP": "Application",
    "AN": "Analysis",
    "EV": "Evaluation",
    "CR": "Creation",
};

const CompanySkills: React.FC<CompanySkillsProps> = ({ skills }) => {
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

    if (!skills || skills.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                <FileCode className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-foreground">No specific skill map available</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2">
                    This company has not provided a detailed skill competency matrix yet. Focus on core engineering fundamentals.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-display font-bold text-foreground">Competency Matrix</h2>
                        <p className="text-sm text-muted-foreground mt-1">Bloom's Taxonomy based skill expectations</p>
                    </div>
                    <div className="flex gap-2 text-xs">
                        {Object.entries(bloomLabels).map(([code, label]) => (
                            <div key={code} className={cn("px-2 py-1 rounded border font-medium", bloomColors[code])}>
                                <span className="font-bold mr-1">{code}</span>
                                <span className="hidden sm:inline">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="py-4 px-4 font-semibold text-sm text-muted-foreground w-1/4">Skill Area</th>
                                <th className="py-4 px-4 font-semibold text-sm text-muted-foreground">Bloom's Level</th>
                                <th className="py-4 px-4 font-semibold text-sm text-muted-foreground">Proficiency (1-10)</th>
                                <th className="py-4 px-4 font-semibold text-sm text-muted-foreground">Topics</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill, idx) => (
                                <React.Fragment key={idx}>
                                    <tr
                                        className={cn(
                                            "group hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/50",
                                            expandedSkill === skill.name ? "bg-muted/50" : ""
                                        )}
                                        onClick={() => setExpandedSkill(expandedSkill === skill.name ? null : skill.name)}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="font-bold text-foreground flex items-center gap-2">
                                                {skill.name}
                                                {expandedSkill === skill.name ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={cn("px-2.5 py-1 rounded-md text-xs font-bold border", bloomColors[skill.bloomLevel])}>
                                                {skill.bloomLevel}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 w-24 bg-muted rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary rounded-full" style={{ width: `${skill.proficiency * 10}%` }} />
                                                </div>
                                                <span className="text-sm font-bold text-foreground">{skill.proficiency}/10</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {skill.topics.slice(0, 2).map(t => (
                                                    <span key={t} className="text-xs bg-secondary px-2 py-0.5 rounded text-secondary-foreground">{t}</span>
                                                ))}
                                                {skill.topics.length > 2 && (
                                                    <span className="text-xs text-muted-foreground px-1">+{skill.topics.length - 2} more</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Expanded Detail View */}
                                    {expandedSkill === skill.name && (
                                        <tr>
                                            <td colSpan={4} className="p-0">
                                                <div className="bg-muted/30 p-6 border-b border-border animate-in slide-in-from-top-2 duration-200">
                                                    <div className="grid md:grid-cols-2 gap-8">
                                                        <div>
                                                            <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
                                                                <BookMarked className="h-4 w-4 text-primary" />
                                                                Required Topics
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {skill.topics.map(t => (
                                                                    <span key={t} className="text-sm bg-card border border-border px-3 py-1.5 rounded-lg shadow-sm">
                                                                        {t}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-2">
                                                                    <Target className="h-4 w-4 text-primary" />
                                                                    Expectation: {bloomLabels[skill.bloomLevel]}
                                                                </h4>
                                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                                    At this level ({skill.bloomLevel}), you are expected to not just understand but
                                                                    {skill.bloomLevel === 'CR' ? ' create new systems ' :
                                                                        skill.bloomLevel === 'EV' ? ' evaluate and optimize existing systems ' :
                                                                            skill.bloomLevel === 'AN' ? ' analyze component interactions ' :
                                                                                skill.bloomLevel === 'AP' ? ' apply concepts to solve problems ' : ' explain core concepts '}
                                                                    related to {skill.name}.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompanySkills;
