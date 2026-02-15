import React, { useState, useMemo } from "react";
import { Company } from "@/data/companies";
import { Check, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/data/companies";

interface CompanySelectorProps {
    companies: Company[];
    selectedCompanies: Company[];
    onToggleCompany: (company: Company) => void;
    maxSelection?: number;
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
    companies,
    selectedCompanies,
    onToggleCompany,
    maxSelection = 5,
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const isSelected = (company: Company) =>
        selectedCompanies.some((c) => c.id === company.id);

    const isMaxReached = selectedCompanies.length >= maxSelection;

    const filteredCompanies = useMemo(() => {
        return companies.filter(
            (company) =>
                company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                company.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [companies, searchQuery]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/20 p-4 rounded-2xl border border-border/50">
                <div>
                    <h2 className="text-xl font-bold text-foreground font-display tracking-tight">
                        Select Companies to Compare
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-2">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
                        {selectedCompanies.length} of {maxSelection} limit selected
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search companies or categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-full border border-border bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm placeholder:text-muted-foreground/60"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 hover:bg-muted rounded-full transition-all"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>
            </div>

            {filteredCompanies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {filteredCompanies.map((company) => {
                        const selected = isSelected(company);
                        const disabled = !selected && isMaxReached;

                        return (
                            <button
                                key={company.id}
                                onClick={() => !disabled && onToggleCompany(company)}
                                disabled={disabled}
                                className={cn(
                                    "group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left",
                                    selected
                                        ? "border-primary bg-primary/[0.03] shadow-soft"
                                        : "border-border bg-card hover:border-primary/40 hover:bg-secondary/50 hover:shadow-card hover:-translate-y-0.5",
                                    disabled && "opacity-40 cursor-not-allowed grayscale"
                                )}
                            >
                                {/* Selection Indicator */}
                                <div
                                    className={cn(
                                        "absolute top-3 right-3 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                                        selected
                                            ? "bg-primary border-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20"
                                            : "bg-background border-border text-muted-foreground group-hover:border-primary/50"
                                    )}
                                >
                                    {selected ? (
                                        <Check className="h-3.5 w-3.5" />
                                    ) : (
                                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-primary/50" />
                                    )}
                                </div>

                                {/* Company Logo container */}
                                <div className={cn(
                                    "h-12 w-12 flex-shrink-0 rounded-xl flex items-center justify-center overflow-hidden p-2 transition-all duration-300 border border-border group-hover:border-primary/30",
                                    selected ? "bg-background shadow-soft ring-1 ring-primary/10" : "bg-muted/50 group-hover:bg-background"
                                )}>
                                    <img
                                        src={company.logo}
                                        alt={company.name}
                                        className="h-full w-full object-contain"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                            (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-sm font-bold text-muted-foreground">${company.name[0]}</span>`;
                                        }}
                                    />
                                </div>

                                {/* Company Info */}
                                <div className="flex-1 min-w-0 pr-8">
                                    <div className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                                        {company.name}
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span
                                            className={cn(
                                                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight",
                                                categoryColors[company.category]
                                            )}
                                        >
                                            {company.category}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="py-12 text-center bg-muted/20 border border-dashed border-border rounded-2xl">
                    <p className="text-muted-foreground">No companies found matching "{searchQuery}"</p>
                    <button
                        onClick={() => setSearchQuery("")}
                        className="mt-2 text-sm text-primary hover:underline"
                    >
                        Clear search
                    </button>
                </div>
            )}

            {selectedCompanies.length > 0 && (
                <button
                    onClick={() => {
                        // Deselect all by triggering the toggle for each selected company
                        // We need a proper way to clear all if the toggle logic is complex
                        // For now, mapping over and calling onToggleCompany works if it's a simple toggle
                        selectedCompanies.forEach(onToggleCompany);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                    <X className="h-3 w-3" />
                    Clear all selections
                </button>
            )}
        </div>
    );
};

export default CompanySelector;
