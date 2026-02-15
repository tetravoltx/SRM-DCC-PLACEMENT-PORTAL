import React from "react";
import { Company } from "@/data/companies";
import { Building, Users, Crosshair, Info, Heart, Rocket } from "lucide-react";
import CompanyAnalytics from "./CompanyAnalytics";

interface CompanyOverviewProps {
    company: Company;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({ company }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* 1. Story / About */}
            <section className="space-y-4">
                <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Who We Are
                </h2>
                <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                    <p>{company.about || company.descriptor}</p>
                </div>
            </section>

            {/* 2. Visual Insights (Restored) */}
            <CompanyAnalytics company={company} />

            {/* 3. Vision & Mission Grid */}
            {(company.vision || company.mission) && (
                <div className="grid md:grid-cols-2 gap-6">
                    {company.vision && (
                        <div className="bg-card p-6 rounded-2xl border border-border shadow-soft">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Crosshair className="h-5 w-5" />
                                </div>
                                <h3 className="font-display font-semibold text-foreground">Vision</h3>
                            </div>
                            <p className="text-sm text-muted-foreground italic">"{company.vision}"</p>
                        </div>
                    )}
                    {company.mission && (
                        <div className="bg-card p-6 rounded-2xl border border-border shadow-soft">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Rocket className="h-5 w-5" />
                                </div>
                                <h3 className="font-display font-semibold text-foreground">Mission</h3>
                            </div>
                            <p className="text-sm text-muted-foreground italic">"{company.mission}"</p>
                        </div>
                    )}
                </div>
            )}

            {/* 4. Key Stats / Culture Highlights */}
            <section>
                <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-6">
                    <Info className="h-5 w-5 text-primary" />
                    At a Glance
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                        <div className="text-2xl font-bold font-display text-foreground">{company.founded}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Founded</div>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                        <div className="text-2xl font-bold font-display text-foreground">{company.employees}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Employees</div>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                        <div className="text-2xl font-bold font-display text-foreground">{company.globalPresence}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Global Presence</div>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                        <div className="text-2xl font-bold font-display text-foreground">{company.revenue}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">Revenue</div>
                    </div>
                </div>
            </section>

            {/* 5. Leadership */}
            {company.leadership && company.leadership.length > 0 && (
                <section>
                    <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-6">
                        <Users className="h-5 w-5 text-primary" />
                        Leadership
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {company.leadership.map((leader, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:shadow-soft transition-all">
                                <img src={leader.image} alt={leader.name} className="h-16 w-16 rounded-full object-cover border-2 border-border" />
                                <div>
                                    <h4 className="font-bold text-foreground">{leader.name}</h4>
                                    <p className="text-sm text-primary font-medium">{leader.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 6. Culture Values */}
            {company.culture && company.culture.length > 0 && (
                <section>
                    <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2 mb-6">
                        <Heart className="h-5 w-5 text-primary" />
                        Culture & Values
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {company.culture.map((c, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-secondary/20 border border-border">
                                <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-foreground text-sm">{c.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default CompanyOverview;
