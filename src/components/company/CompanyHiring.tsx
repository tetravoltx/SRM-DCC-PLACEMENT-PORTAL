import React from "react";
import { Company } from "@/data/companies";
import { CalendarCheck, Monitor, Timer, CheckCircle2, Banknote, Briefcase } from "lucide-react";

interface CompanyHiringProps {
    company: Company;
}

const CompanyHiring: React.FC<CompanyHiringProps> = ({ company }) => {
    return (
        <div className="space-y-8 animate-fade-in">

            {/* 1. Job Role & Compensation Header */}
            <section className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Target Role</h2>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Briefcase className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-display font-bold text-xl text-foreground">Software Development Engineer</div>
                                <div className="text-sm text-muted-foreground">Full-time · {company.location}</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {company.eligibility.map(e => (
                                <span key={e} className="text-xs font-medium bg-card text-foreground border border-border px-3 py-1 rounded-full shadow-sm">
                                    {e}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-secondary/20 rounded-xl p-5 border border-border/50">
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Banknote className="h-4 w-4" /> Compensation
                        </h2>
                        <div className="text-3xl font-display font-bold text-foreground mb-1">{company.compensationRange}</div>
                        <div className="text-sm text-muted-foreground">CTC Breakdown available in Financials</div>
                    </div>
                </div>
            </section>

            {/* 2. Hiring Rounds Timeline */}
            <section>
                <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-6">
                    <CalendarCheck className="h-5 w-5 text-primary" />
                    Selection Process
                </h2>

                <div className="relative space-y-0 max-w-3xl mx-auto">
                    {company.selectionProcess.map((round, i) => (
                        <div key={i} className="relative pl-10 pb-10 last:pb-0 group">
                            {/* Vertical Line */}
                            {i < company.selectionProcess.length - 1 && (
                                <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-border group-hover:bg-primary/30 transition-colors" />
                            )}

                            {/* Number Badge */}
                            <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-card border-2 border-primary text-primary font-bold flex items-center justify-center shadow-sm z-10 text-sm">
                                {i + 1}
                            </div>

                            <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                    <h3 className="font-display font-bold text-lg text-foreground">{round.title}</h3>
                                    <div className="flex gap-3 text-xs font-medium text-muted-foreground">
                                        <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded"><Monitor className="h-3 w-3" /> {round.mode}</span>
                                        <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded"><Timer className="h-3 w-3" /> {round.duration}</span>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{round.description}</p>

                                {/* Deep Dive Section */}
                                {(round.focus || (round.questions && round.questions.length > 0)) && (
                                    <div className="bg-muted/30 rounded-lg p-4 grid md:grid-cols-2 gap-4">
                                        {round.focus && (
                                            <div>
                                                <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Focus Area</div>
                                                <p className="text-sm text-primary font-medium">{round.focus}</p>
                                            </div>
                                        )}
                                        {round.questions && round.questions.length > 0 && (
                                            <div>
                                                <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Typical Questions</div>
                                                <ul className="space-y-1">
                                                    {round.questions.map((q, idx) => (
                                                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                            <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                                                            <span>{q}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CompanyHiring;
