import React from "react";
import { InnovXProject } from "@/data/companies";
import { Sparkles, ArrowUpRight, Code2, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyInnovXProps {
    projects?: InnovXProject[];
}

const difficultyColors = {
    "Beginner": "bg-secondary text-foreground border-border",
    "Intermediate": "bg-secondary text-foreground border-primary/40",
    "Advanced": "bg-primary/10 text-primary border-primary/30",
};

const CompanyInnovX: React.FC<CompanyInnovXProps> = ({ projects }) => {
    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                <Sparkles className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-foreground">No Innovation Projects Listed</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2">
                    This company hasn't listed any specific InnovX challenges yet. Check back later for hackathons or project challenges.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        InnovX Challenges
                    </h2>
                    <p className="text-sm text-muted-foreground">Build real-world projects to stand out.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, idx) => (
                    <div key={idx} className="group relative bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute top-6 right-6">
                            <span className={cn("text-xs font-bold px-2 py-1 rounded-full border", difficultyColors[project.difficulty])}>
                                {project.difficulty}
                            </span>
                        </div>

                        <div className="h-12 w-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary mb-6 shadow-soft">
                            <BrainCircuit className="h-6 w-6" />
                        </div>

                        <h3 className="font-display font-bold text-xl text-foreground mb-3 pr-20">{project.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {project.description}
                        </p>

                        <div className="mb-6">
                            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Relevance</h4>
                            <p className="text-sm font-medium text-primary bg-primary/5 px-3 py-2 rounded-lg inline-block">
                                {project.relevance}
                            </p>
                        </div>

                        <div className="border-t border-border pt-4 mt-auto">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.skills.map(s => (
                                    <span key={s} className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md border border-border/50">
                                        {s}
                                    </span>
                                ))}
                            </div>
                            <button className="w-full py-2.5 rounded-xl bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                Start Project <ArrowUpRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyInnovX;
