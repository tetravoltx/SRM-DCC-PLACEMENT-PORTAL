import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { companies } from "@/data/companies";
import CompanySelector from "@/components/analytics/CompanySelector";
import SkillComparisonTable from "@/components/analytics/SkillComparisonTable";
import { TrendingUp, Lightbulb } from "lucide-react";
import type { Company } from "@/data/companies";

const SkillSetAnalytics = () => {
    const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);

    const handleToggleCompany = (company: Company) => {
        setSelectedCompanies((prev) => {
            const isSelected = prev.some((c) => c.id === company.id);
            if (isSelected) {
                return prev.filter((c) => c.id !== company.id);
            } else {
                return [...prev, company];
            }
        });
    };

    return (
        <Layout>
            {/* Sub-Header */}
            <div className="border-b border-border bg-card/40 backdrop-blur-sm sticky top-[73px] z-20">
                <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <TrendingUp className="h-4 w-4" />
                        <span>Analytics</span>
                    </Link>
                    <div className="h-4 w-px bg-border" />
                    <span className="font-display font-semibold text-foreground text-sm">Skill Matrix</span>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-6 pb-20">
                {/* Header Section */}
                <section className="pt-16 pb-12 animate-in fade-in slide-in-from-top-4 duration-700 fill-mode-both">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-soft transition-transform hover:scale-110">
                                <TrendingUp className="h-7 w-7 text-primary" />
                            </div>
                            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight text-balance">
                                Skill Set Analytics
                            </h1>
                            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                                Compare skill requirements across elite recruiting companies.
                                Identify gaps in your preparation and prioritize your learning based on target companies.
                            </p>
                        </div>

                        {/* Decision-Making Tip - Glassmorphism style */}
                        <div className="flex-shrink-0 w-full md:w-80 bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-xl bg-accent/20 group-hover:bg-accent/30 transition-colors">
                                    <Lightbulb className="h-5 w-5 text-accent" />
                                </div>
                                <h3 className="font-bold text-foreground">Pro Tip</h3>
                            </div>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Hover over any skill cell to see detailed topics and proficiency expectations.
                                Select up to 5 companies for a comprehensive comparison.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Company Selector */}
                <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
                    <CompanySelector
                        companies={companies}
                        selectedCompanies={selectedCompanies}
                        onToggleCompany={handleToggleCompany}
                        maxSelection={5}
                    />
                </div>

                {/* Comparison Table */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
                    {selectedCompanies.length > 0 ? (
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6 font-display tracking-tight">
                                Skill Comparison Matrix
                            </h2>
                            <SkillComparisonTable selectedCompanies={selectedCompanies} />
                        </div>
                    ) : (
                        <div className="bg-muted/30 border border-dashed border-border rounded-3xl p-20 text-center shadow-inner">
                            <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-30" />
                            <h3 className="text-xl font-semibold text-foreground mb-2 font-display">
                                Select Companies to Compare
                            </h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Choose at least one company from the selector above to start comparing skill requirements.
                                You can select up to 5 companies for a comprehensive comparison.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </Layout>
    );
};

export default SkillSetAnalytics;
