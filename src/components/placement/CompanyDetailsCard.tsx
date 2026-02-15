import { Link } from "react-router-dom";
import { MapPin, Building, Users, Briefcase, ArrowRight, BadgeCheck } from "lucide-react";
import { Company, categoryColors } from "@/data/companies";
import { cn } from "@/lib/utils";

interface CompanyDetailsCardProps {
    company: Company;
}

const CompanyDetailsCard = ({ company }: CompanyDetailsCardProps) => {
    return (
        <Link
            to={`/company/${company.id}`}
            className="group block rounded-2xl bg-card border border-border/50 p-6 transition-all duration-300 hover:shadow-3d hover:border-primary/20 hover:-translate-y-1"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Identity Section */}
                <div className="flex items-start gap-5 flex-1 min-w-0">
                    <div className="h-16 w-16 flex-shrink-0 rounded-2xl bg-secondary/50 flex items-center justify-center overflow-hidden p-2.5 group-hover:bg-primary/5 transition-colors">
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="h-full w-full object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-2xl font-bold text-muted-foreground">${company.name[0]}</span>`;
                            }}
                        />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                {company.name}
                            </h3>
                            <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider", categoryColors[company.category])}>
                                {company.category}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-3">{company.descriptor}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Building className="h-3 w-3" />{company.industry}</span>
                            <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{company.type}</span>
                            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{company.employees}</span>
                        </div>
                    </div>
                </div>

                {/* Highlights Section */}
                <div className="grid grid-cols-2 gap-8 md:px-8 border-l border-r border-border/50 hidden lg:grid">
                    <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Compensation</p>
                        <p className="text-xl font-bold text-compensation font-display leading-none">{company.compensationRange}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Avg: {company.averagePackage}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Eligibility</p>
                        <div className="space-y-1">
                            {company.eligibility.slice(0, 2).map((e, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-xs text-foreground/80">
                                    <BadgeCheck className="h-3 w-3 text-primary" />
                                    <span className="truncate max-w-[120px]">{e}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Section */}
                <div className="flex items-center justify-between md:justify-end gap-6 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground justify-end mb-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{company.location}</span>
                        </div>
                        <span className="rounded-full bg-secondary/80 px-3 py-0.5 text-[10px] font-bold text-secondary-foreground uppercase tracking-tight">
                            {company.workMode}
                        </span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <ArrowRight className="h-5 w-5" />
                    </div>
                </div>
            </div>

            {/* Footer Tags */}
            <div className="mt-6 pt-4 border-t border-border/30 flex flex-wrap gap-2">
                {company.technologies.slice(0, 5).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded-md bg-muted/50 text-[10px] font-medium text-muted-foreground">
                        {tech}
                    </span>
                ))}
                {company.technologies.length > 5 && (
                    <span className="text-[10px] text-muted-foreground pt-0.5">+{company.technologies.length - 5} more</span>
                )}
            </div>
        </Link>
    );
};

export default CompanyDetailsCard;
