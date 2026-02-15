/**
 * Company Data Mapper
 * 
 * Maps Supabase CompanyRow to frontend Company interface
 * Handles field name transformations and data parsing
 */

import type { CompanyRow } from '@/types/database';
import type { Company } from '@/data/companies';

/**
 * Parse JSON string safely
 */
function parseJSON<T>(value: string | null | undefined, fallback: T): T {
    if (!value) return fallback;
    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
}

/**
 * Parse comma-separated string to array
 */
function parseArray(value: string | null | undefined): string[] {
    if (!value) return [];
    return value.split(',').map(s => s.trim()).filter(Boolean);
}

/**
 * Map Supabase row to frontend Company interface
 * 
 * @param row - Raw row from Supabase public.company table
 * @returns Mapped Company object for frontend use
 */
export function mapCompanyRow(row: CompanyRow): Company {
    return {
        // Basic mapping
        id: row.company_id,
        name: row.company_name,
        logo: row.logo || '',
        descriptor: row.overview_of_the_company || row.short_name || '',
        category: row.category as any, // TODO: Validate category enum
        industry: row.focus_sectors_industries || '',
        type: row.nature_of_company || '',
        founded: row.year_of_incorporation || '',
        employees: row.employee_size || '',

        // Compensation
        compensationRange: row.fixed_vs_variable_pay || '',
        ctcValue: 0, // TODO: Parse from compensation data
        fixedComponent: 0,
        variableComponent: 0,
        bonus: 0,
        serviceAgreement: '', // TODO: Map from appropriate field

        // Location
        location: row.company_headquarters || '',
        locations: parseArray(row.office_locations),
        workMode: row.remote_work_policy || '',

        // Eligibility - TODO: Parse from appropriate fields
        eligibility: [],

        // Financial metrics
        revenue: row.annual_revenues || '',
        marketCap: row.company_valuation || '',
        globalPresence: row.countries_operating_in || '',

        // Hiring data - TODO: Parse hiring_velocity into trend array
        hiringTrend: [],
        compensationHistory: [],
        studentsSelected: 0,
        highestPackage: '',
        averagePackage: '',
        departmentsSelected: [],

        // Role details
        roleDescription: row.services_offerings_products || '',
        teamStructure: row.work_culture || '',
        technologies: parseArray(row.tech_stack_tools_used),
        department: '',
        employmentType: '',

        // Selection process - TODO: Parse from appropriate fields
        selectionProcess: [],

        // Skills - TODO: Parse tech_stack into skills array
        skills: [],

        // InnovX projects - TODO: Map from innovation fields
        innovxProjects: [],

        // Leadership - TODO: Parse key_business_leaders
        leadership: [],

        // Financials
        financials: {
            revenueGrowth: row.year_over_year_growth_rate || '',
            profitMargin: row.profitability_status || '',
            rndIvestment: row.r_and_d_investment || '',
        },

        // Culture - TODO: Parse values and culture fields
        culture: [],

        // Narrative
        about: row.overview_of_the_company || '',
        vision: row.vision || '',
        mission: row.mission || '',
    };
}

/**
 * Map array of Supabase rows to Company array
 */
export function mapCompanyRows(rows: CompanyRow[]): Company[] {
    return rows.map(mapCompanyRow);
}
