import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { companies, categories, type PlacementCategory } from "@/data/companies";
import CompanyCard from "@/components/placement/CompanyCard";
import CompanyDetailsCard from "@/components/placement/CompanyDetailsCard";
import InnovXSection from "@/components/placement/InnovXSection";
import Layout from "@/components/Layout";
import { useSearchParams } from "react-router-dom";

import { cn } from "@/lib/utils";

const Index = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "dashboard";
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<PlacementCategory | "All">("All");

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.descriptor.toLowerCase().includes(search.toLowerCase()) ||
        c.industry.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === "All" || c.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const isCompaniesView = view === "companies";

  return (
    <Layout>
      <main className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Hero Section */}
            <section className="pt-16 pb-12">
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight text-balance">
                {isCompaniesView ? "Companies Library" : "SRM DCC Placement Portal"}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                {isCompaniesView
                  ? "Comprehensive database of recruiting companies, eligibility criteria, and hiring insights."
                  : "Official recruitment insights and company information by Directorate of Career Centre (DCC)."}
              </p>

              {/* Search */}
              <div className="mt-10 relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search companies, roles, or industries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-card py-3.5 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                />
              </div>

              {/* Filter Chips */}
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter("All")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeFilter === "All"
                    ? "bg-foreground text-background shadow-soft"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeFilter === cat
                      ? "bg-foreground text-background shadow-soft"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Company View */}
            <section className="pb-20">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {filtered.length} {filtered.length === 1 ? "company" : "companies"} found
                </p>
              </div>

              <div className={cn(
                "grid gap-5",
                isCompaniesView ? "grid-cols-1" : "sm:grid-cols-2"
              )}>
                {filtered.map((company, i) => (
                  <div key={company.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    {isCompaniesView ? (
                      <CompanyDetailsCard company={company} />
                    ) : (
                      <CompanyCard company={company} />
                    )}
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">No companies match your search.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar / InnovX Section */}
          {!isCompaniesView && (
            <aside className="w-full lg:w-80 pt-16 pb-20 sticky top-0 hidden xl:block">
              <InnovXSection />
            </aside>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Index;
