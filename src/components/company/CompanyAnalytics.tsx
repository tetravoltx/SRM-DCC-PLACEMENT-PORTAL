import React from "react";
import { Company } from "@/data/companies";
import {
    LineChart, Line, AreaChart, Area,
    XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from "recharts";

interface CompanyAnalyticsProps {
    company: Company;
}

const CompanyAnalytics: React.FC<CompanyAnalyticsProps> = ({ company }) => {
    return (
        <section className="py-6 animate-fade-in">
            <h2 className="font-display text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                Visual Insights
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
                {/* Hiring Trend */}
                <div className="rounded-2xl bg-card p-6 shadow-soft border border-border">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Hiring Trend</h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={company.hiringTrend}>
                                <defs>
                                    <linearGradient id="hiringGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={30} />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px" }}
                                    itemStyle={{ color: "hsl(var(--foreground))" }}
                                    labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                                />
                                <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#hiringGrad)" name="Students Hired" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Compensation Trend */}
                <div className="rounded-2xl bg-card p-6 shadow-soft border border-border">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Compensation Trend (LPA)</h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={company.compensationHistory}>
                                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={30} />
                                <Tooltip
                                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px" }}
                                    itemStyle={{ color: "hsl(var(--foreground))" }}
                                    labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                                />
                                <Line type="monotone" dataKey="ctc" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--primary))" }} name="CTC (LPA)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyAnalytics;
