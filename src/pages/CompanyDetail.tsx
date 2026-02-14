import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Building2, Users, Globe, Download, Briefcase, Calendar } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from "recharts";
import { companies, categoryColors } from "@/data/companies";

import Layout from "@/components/Layout";

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

  const compensationBreakdown = [
    { label: "Fixed", value: company.fixedComponent, percent: Math.round((company.fixedComponent / company.ctcValue) * 100) },
    { label: "Variable", value: company.variableComponent, percent: Math.round((company.variableComponent / company.ctcValue) * 100) },
    { label: "Bonus", value: company.bonus, percent: Math.round((company.bonus / company.ctcValue) * 100) },
  ];

  const formatCurrency = (v: number) => {
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
    return `₹${v.toLocaleString("en-IN")}`;
  };

  return (
    <Layout>
      {/* Sub-Header */}
      <div className="border-b border-border bg-card/40 backdrop-blur-sm sticky top-[73px] z-20">
        <div className="mx-auto max-w-5xl px-6 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">All Companies</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="font-display font-semibold text-foreground text-sm truncate">{company.name}</span>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 pb-20">
        {/* SECTION 1: Identity Hero */}
        <section className="pt-12 pb-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="h-16 w-16 rounded-2xl bg-card shadow-card flex items-center justify-center overflow-hidden p-2 flex-shrink-0">
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
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {company.name}
                </h1>
                <p className="mt-1 text-muted-foreground text-lg">{company.descriptor}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span>{company.industry}</span>
                  <span className="text-border">·</span>
                  <span>{company.type}</span>
                  <span className="text-border">·</span>
                  <span>Founded {company.founded}</span>
                  <span className="text-border">·</span>
                  <span>{company.employees} Employees</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
              <span className={`rounded-full px-4 py-1.5 text-sm font-medium ${categoryColors[company.category]}`}>
                {company.category}
              </span>
              <p className="text-3xl font-bold text-compensation font-display">{company.compensationRange}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {company.locations.join(", ")}
                </span>
                <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-medium text-secondary-foreground">
                  {company.workMode}
                </span>
              </div>
            </div>
          </div>

          {/* Eligibility Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {company.eligibility.map((e) => (
              <span key={e} className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                {e}
              </span>
            ))}
          </div>
        </section>

        <hr className="border-border" />

        {/* SECTION 2: Company Snapshot */}
        <section className="py-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Company Snapshot</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              { label: "Revenue", value: company.revenue, icon: Building2 },
              { label: "Market Cap", value: company.marketCap, icon: Globe },
              { label: "Employees", value: company.employees, icon: Users },
              { label: "Global Presence", value: company.globalPresence, icon: Globe },
              { label: "Campus Hires '25", value: String(company.studentsSelected), icon: Briefcase },
            ].map((m) => (
              <div key={m.label} className="rounded-2xl bg-card p-5 shadow-soft">
                <p className="text-2xl font-bold text-foreground font-display">{m.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border" />

        {/* SECTION 3: Visual Insights */}
        <section className="py-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Visual Insights</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Hiring Trend */}
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Hiring Trend</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={company.hiringTrend}>
                    <defs>
                      <linearGradient id="hiringGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--chart-line))" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="hsl(var(--chart-line))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(var(--text-tertiary))" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "hsl(var(--text-tertiary))" }} axisLine={false} tickLine={false} width={30} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px" }}
                    />
                    <Area type="monotone" dataKey="count" stroke="hsl(var(--chart-line))" strokeWidth={2} fill="url(#hiringGrad)" name="Students Hired" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Compensation Trend */}
            <div className="rounded-2xl bg-card p-6 shadow-soft">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Compensation Trend (LPA)</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={company.compensationHistory}>
                    <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(var(--text-tertiary))" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "hsl(var(--text-tertiary))" }} axisLine={false} tickLine={false} width={30} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px" }}
                    />
                    <Line type="monotone" dataKey="ctc" stroke="hsl(var(--compensation))" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--compensation))" }} name="CTC (LPA)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* SECTION 4: Role & Responsibilities */}
        <section className="py-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Role & Responsibilities</h2>
          <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-foreground/90">
            <p>{company.roleDescription}</p>
            <p>{company.teamStructure}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {company.technologies.map((t) => (
                <span key={t} className="rounded-lg bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-6 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />{company.department}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{company.employmentType}</span>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* SECTION 5: Selection Process */}
        <section className="py-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Selection Process</h2>
          <div className="max-w-2xl space-y-0">
            {company.selectionProcess.map((round, i) => (
              <div key={i} className="relative pl-8 pb-8 last:pb-0">
                {/* Vertical line */}
                {i < company.selectionProcess.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
                )}
                {/* Dot */}
                <div className="absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border-2 border-primary bg-card flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{round.title}</h3>
                  <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{round.mode}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{round.duration}</span>
                  </div>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{round.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border" />

        {/* SECTION 6: Compensation Breakdown */}
        <section className="py-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Compensation Breakdown</h2>
          <div className="max-w-lg">
            <p className="text-3xl font-bold text-foreground font-display mb-6">
              {formatCurrency(company.ctcValue)} <span className="text-base font-normal text-muted-foreground">per annum</span>
            </p>
            <div className="space-y-3">
              {compensationBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/70 transition-all duration-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {company.serviceAgreement !== "None" && (
              <p className="mt-5 text-sm text-muted-foreground rounded-xl bg-accent px-4 py-3">
                Service agreement: {company.serviceAgreement}
              </p>
            )}
          </div>
        </section>

        <hr className="border-border" />

        {/* SECTION 7: Institutional Placement Data */}
        <section className="py-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Institutional Placement Data</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <div className="rounded-2xl bg-card p-5 shadow-soft">
              <p className="text-2xl font-bold text-foreground font-display">{company.studentsSelected}</p>
              <p className="mt-1 text-sm text-muted-foreground">Students Selected</p>
            </div>
            <div className="rounded-2xl bg-card p-5 shadow-soft">
              <p className="text-2xl font-bold text-compensation font-display">{company.highestPackage}</p>
              <p className="mt-1 text-sm text-muted-foreground">Highest Package</p>
            </div>
            <div className="rounded-2xl bg-card p-5 shadow-soft">
              <p className="text-2xl font-bold text-foreground font-display">{company.averagePackage}</p>
              <p className="mt-1 text-sm text-muted-foreground">Average Package</p>
            </div>
            <div className="rounded-2xl bg-card p-5 shadow-soft">
              <p className="text-lg font-semibold text-foreground font-display">{company.departmentsSelected.join(", ")}</p>
              <p className="mt-1 text-sm text-muted-foreground">Departments</p>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* SECTION 8: Documents */}
        <section className="py-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Documents</h2>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-card px-5 py-3 text-sm font-medium text-foreground shadow-soft hover:shadow-card transition-shadow">
              <Download className="h-4 w-4 text-muted-foreground" />
              Job Description
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-card px-5 py-3 text-sm font-medium text-foreground shadow-soft hover:shadow-card transition-shadow">
              <Download className="h-4 w-4 text-muted-foreground" />
              Offer Structure
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default CompanyDetail;
