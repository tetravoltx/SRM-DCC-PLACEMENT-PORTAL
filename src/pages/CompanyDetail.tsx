import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { companies, categoryColors } from "@/data/companies";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import Layout from "@/components/Layout";
import CompanyOverview from "@/components/company/CompanyOverview";
import CompanySkills from "@/components/company/CompanySkills";
import CompanyInnovX from "@/components/company/CompanyInnovX";
import CompanyHiring from "@/components/company/CompanyHiring";

const CompanyDetail = () => {
  const { id } = useParams();
  const company = companies.find((c) => c.id === id);

  if (!company) {
    return (
      <Layout showSidebar={false}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground">Company not found</h1>
            <Link to="/" className="mt-4 inline-block text-primary hover:underline">← Back to portal</Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Mandatory Tabs (All Required)
  const tabs = [
    { id: "overview", label: "Overview", component: <CompanyOverview company={company} /> },
    { id: "skills", label: "Skill Matrix", component: <CompanySkills skills={company.skills} /> },
    { id: "innovx", label: "InnovX", component: <CompanyInnovX projects={company.innovxProjects} /> },
    { id: "hiring", label: "Hiring Rounds", component: <CompanyHiring company={company} /> },
    // Data-light tabs for now, reusing Overview or placeholders
    { id: "business", label: "Business & Market", component: <div className="p-10 text-center text-muted-foreground">Market Position & Business Model to be added.</div> },
    { id: "leadership", label: "Leadership", component: <div className="p-10 text-center text-muted-foreground">Detailed Leadership & Governance structure.</div> },
    { id: "financials", label: "Financials", component: <div className="p-10 text-center text-muted-foreground">Detailed Financial reports & projections.</div> },
    { id: "tech", label: "Technology", component: <div className="p-10 text-center text-muted-foreground">Technology Stack & Innovation roadmap.</div> },
    { id: "culture", label: "Culture", component: <div className="p-10 text-center text-muted-foreground">Work Life, Benefits & Cultural nuances.</div> },
    { id: "risk", label: "Risk & ESG", component: <div className="p-10 text-center text-muted-foreground">Risk Management & ESG goals.</div> },
    { id: "strategy", label: "Strategy", component: <div className="p-10 text-center text-muted-foreground">Future Outlook & Strategic goals.</div> },
  ];

  const [showLeftFade, setShowLeftFade] = React.useState(false);
  const [showRightFade, setShowRightFade] = React.useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftFade(scrollLeft > 10);
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScroll();
      container.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, []);

  return (
    <Layout>
      {/* Sub-Header */}
      {/* Sub-Header (Scrolls away to save space) */}
      <div className="border-b border-border bg-card/40 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">All Companies</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="font-display font-semibold text-foreground text-sm truncate">{company.name}</span>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 pb-20">
        {/* SECTION 1: Identity Hero */}
        <section className="pt-10 pb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="h-20 w-20 rounded-2xl bg-card shadow-card flex items-center justify-center overflow-hidden p-3 flex-shrink-0 border border-border">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerText = company.name[0];
                  }}
                />
              </div>
              <div>
                <h1 className="font-display text-4xl font-extrabold text-foreground tracking-tight">
                  {company.name}
                </h1>
                <p className="mt-2 text-muted-foreground text-lg max-w-2xl">{company.descriptor}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryColors[company.category]}`}>
                    {company.category}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/50">
                    <MapPin className="h-3.5 w-3.5" />
                    {company.locations[0]}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/50">
                    {company.industry}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0 bg-card p-4 rounded-2xl shadow-soft border border-border">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">CTC Range</p>
              <p className="text-3xl font-bold text-primary font-display">{company.compensationRange}</p>
              <p className="text-xs text-muted-foreground mt-1 text-right w-full">View breakdown in Hiring tab</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: TABS */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <div className="sticky top-[72px] z-10 bg-background/95 backdrop-blur-sm py-2 -mx-6 px-6 border-b border-border mb-6 transition-all duration-300">
              <div className="relative">
                <div
                  ref={scrollContainerRef}
                  className="overflow-x-auto scrollbar-hide py-4 -mx-6"
                >
                  <TabsList className="h-auto bg-transparent flex justify-start w-max min-w-full gap-2 pl-6 pr-12">
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="rounded-full px-5 py-2.5 text-sm font-medium border border-transparent transition-all duration-300
                        hover:bg-accent hover:text-foreground hover:shadow-sm
                        data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-lg data-[state=active]:border-foreground/10
                        data-[state=active]:scale-105"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {/* Natural fade gradient with multiple stops for a seamless transition */}
                <div className={`absolute top-0 bottom-0 right-[-24px] w-40 bg-gradient-to-l from-background via-background/90 via-background/40 to-transparent pointer-events-none z-20 transition-opacity duration-300 ${showRightFade ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute top-0 bottom-0 left-[-24px] w-12 bg-gradient-to-r from-background via-background/40 to-transparent pointer-events-none z-20 transition-opacity duration-300 ${showLeftFade ? 'opacity-60' : 'opacity-0'}`} />
              </div>
            </div>

            <div className="mt-6">
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="focus:outline-none">
                  {tab.component}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </main>
    </Layout>
  );
};

export default CompanyDetail;
