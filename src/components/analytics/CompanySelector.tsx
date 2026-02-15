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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-foreground">
                        Select Companies to Compare
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {selectedCompanies.length} / {maxSelection} selected
                    </p>
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search companies or categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
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
                                    "relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left",
                                    selected
                                        ? "border-primary bg-primary/5 shadow-sm"
                                        : "border-border bg-card hover:border-primary/50 hover:bg-muted/50",
                                    disabled && "opacity-40 cursor-not-allowed"
                                )}
                            >
                                {/* Selection Indicator */}
                                <div
                                    className={cn(
                                        "absolute top-2 right-2 h-5 w-5 rounded-full flex items-center justify-center transition-all",
                                        selected
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    {selected ? (
                                        <Check className="h-3 w-3" />
                                    ) : (
                                        <div className="h-2 w-2 rounded-full bg-current opacity-30" />
                                    )}
                                </div>

                                {/* Company Logo */}
                                <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden p-1.5">
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
                                <div className="flex-1 min-w-0 pr-6">
                                    <div className="font-bold text-sm text-foreground truncate">
                                        {company.name}
                                    </div>
                                    <span
                                        className={cn(
                                            "inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight",
                                            categoryColors[company.category]
                                        )}
                                    >
                                        {company.category}
                                    </span>
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
