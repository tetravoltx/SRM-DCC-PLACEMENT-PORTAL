import { useState } from "react";
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
            <main className="mx-auto max-w-7xl px-6 py-16">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="font-display text-4xl font-extrabold text-foreground tracking-tight">
                                Skill Set Analytics
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Cross-Company Comparison Matrix
                            </p>
                        </div>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        Compare skill requirements across companies to make informed decisions about your learning priorities.
                        Select up to 5 companies to see a side-by-side comparison of their skill expectations.
                    </p>
                </div>

                {/* Decision-Making Tip */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 flex gap-4">
                    <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-foreground mb-1">Decision-Making Tool</h3>
                        <p className="text-sm text-muted-foreground">
                            Hover over any skill cell to see detailed topics and proficiency expectations.
                            Use this to identify skill gaps and prioritize your learning based on target companies.
                        </p>
                    </div>
                </div>

                {/* Company Selector */}
                <div className="mb-10">
                    <CompanySelector
                        companies={companies}
                        selectedCompanies={selectedCompanies}
                        onToggleCompany={handleToggleCompany}
                        maxSelection={5}
                    />
                </div>

                {/* Comparison Table */}
                {selectedCompanies.length > 0 ? (
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">
                            Skill Comparison Matrix
                        </h2>
                        <SkillComparisonTable selectedCompanies={selectedCompanies} />
                    </div>
                ) : (
                    <div className="bg-muted/30 border border-dashed border-border rounded-3xl p-20 text-center">
                        <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-30" />
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            Select Companies to Compare
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Choose at least one company from the selector above to start comparing skill requirements.
                            You can select up to 5 companies for a comprehensive comparison.
                        </p>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default SkillSetAnalytics;
