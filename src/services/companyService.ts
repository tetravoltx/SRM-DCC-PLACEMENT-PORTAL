/**
 * Company Service - Data Access Layer
 * 
 * Centralized service for all company data operations
 * All methods query Supabase public.company table
 * 
 * IMPORTANT: This is the ONLY place where Supabase queries should be made
 */

import { supabase } from '@/lib/supabase';
import { mapCompanyRow, mapCompanyRows } from '@/lib/companyMapper';
import type { Company } from '@/data/companies';
import type { CompanyRow } from '@/types/database';

/**
 * Error wrapper for Supabase errors
 */
class CompanyServiceError extends Error {
    constructor(message: string, public originalError?: any) {
        super(message);
        this.name = 'CompanyServiceError';
    }
}

/**
 * Company Service
 * 
 * Provides type-safe, async methods for fetching company data
 */
export const companyService = {
    /**
     * Get all companies
     * 
     * @param options - Optional query options
     * @returns Array of all companies
     */
    async getAllCompanies(options?: {
        limit?: number;
        offset?: number;
        orderBy?: keyof CompanyRow;
        ascending?: boolean;
    }): Promise<Company[]> {
        try {
            let query = supabase.from('company').select('*');

            if (options?.orderBy) {
                query = query.order(options.orderBy, {
                    ascending: options.ascending ?? true,
                });
            }

            if (options?.limit) {
                query = query.limit(options.limit);
            }

            if (options?.offset) {
                query = query.range(
                    options.offset,
                    options.offset + (options.limit || 100) - 1
                );
            }

            const { data, error } = await query;

            if (error) {
                throw new CompanyServiceError('Failed to fetch companies', error);
            }

            return mapCompanyRows(data || []);
        } catch (error) {
            console.error('Error in getAllCompanies:', error);
            throw error;
        }
    },

    /**
     * Get company by ID
     * 
     * @param id - Company ID (company_id)
     * @returns Single company or null if not found
     */
    async getCompanyById(id: string): Promise<Company | null> {
        try {
            const { data, error } = await supabase
                .from('company')
                .select('*')
                .eq('company_id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // Not found
                    return null;
                }
                throw new CompanyServiceError(
                    `Failed to fetch company ${id}`,
                    error
                );
            }

            return data ? mapCompanyRow(data) : null;
        } catch (error) {
            console.error(`Error in getCompanyById(${id}):`, error);
            throw error;
        }
    },

    /**
     * Get companies by category
     * 
     * @param category - Company category
     * @returns Array of companies in the category
     */
    async getCompaniesByCategory(category: string): Promise<Company[]> {
        try {
            const { data, error } = await supabase
                .from('company')
                .select('*')
                .eq('category', category);

            if (error) {
                throw new CompanyServiceError(
                    `Failed to fetch companies by category ${category}`,
                    error
                );
            }

            return mapCompanyRows(data || []);
        } catch (error) {
            console.error(`Error in getCompaniesByCategory(${category}):`, error);
            throw error;
        }
    },

    /**
     * Search companies by name or short name
     * 
     * @param query - Search query string
     * @returns Array of matching companies
     */
    async searchCompanies(query: string): Promise<Company[]> {
        try {
            if (!query.trim()) {
                return [];
            }

            const searchPattern = `%${query}%`;

            const { data, error } = await supabase
                .from('company')
                .select('*')
                .or(
                    `company_name.ilike.${searchPattern},short_name.ilike.${searchPattern}`
                );

            if (error) {
                throw new CompanyServiceError(
                    `Failed to search companies with query "${query}"`,
                    error
                );
            }

            return mapCompanyRows(data || []);
        } catch (error) {
            console.error(`Error in searchCompanies("${query}"):`, error);
            throw error;
        }
    },

    /**
     * Compare multiple companies by IDs
     * 
     * @param ids - Array of company IDs
     * @returns Array of companies (preserves order)
     */
    async compareCompanies(ids: string[]): Promise<Company[]> {
        try {
            if (ids.length === 0) {
                return [];
            }

            const { data, error } = await supabase
                .from('company')
                .select('*')
                .in('company_id', ids);

            if (error) {
                throw new CompanyServiceError(
                    `Failed to fetch companies for comparison`,
                    error
                );
            }

            // Preserve order based on input IDs
            const companyMap = new Map(
                (data || []).map((row) => [row.company_id, mapCompanyRow(row)])
            );

            return ids
                .map((id) => companyMap.get(id))
                .filter((c): c is Company => c !== undefined);
        } catch (error) {
            console.error('Error in compareCompanies:', error);
            throw error;
        }
    },

    /**
     * Get company statistics for analytics
     * 
     * @returns Aggregated statistics
     */
    async getCompanyStats(): Promise<{
        totalCount: number;
        byCategory: Record<string, number>;
        byProfitability: Record<string, number>;
        byHiringVelocity: Record<string, number>;
    }> {
        try {
            // Get all companies with minimal fields for stats
            const { data, error } = await supabase
                .from('company')
                .select('category, profitability_status, hiring_velocity');

            if (error) {
                throw new CompanyServiceError('Failed to fetch company stats', error);
            }

            const companies = data || [];

            // Aggregate statistics
            const byCategory: Record<string, number> = {};
            const byProfitability: Record<string, number> = {};
            const byHiringVelocity: Record<string, number> = {};

            companies.forEach((company) => {
                // Category count
                if (company.category) {
                    byCategory[company.category] =
                        (byCategory[company.category] || 0) + 1;
                }

                // Profitability count
                if (company.profitability_status) {
                    byProfitability[company.profitability_status] =
                        (byProfitability[company.profitability_status] || 0) + 1;
                }

                // Hiring velocity count
                if (company.hiring_velocity) {
                    byHiringVelocity[company.hiring_velocity] =
                        (byHiringVelocity[company.hiring_velocity] || 0) + 1;
                }
            });

            return {
                totalCount: companies.length,
                byCategory,
                byProfitability,
                byHiringVelocity,
            };
        } catch (error) {
            console.error('Error in getCompanyStats:', error);
            throw error;
        }
    },

    /**
     * Get distinct categories
     * 
     * @returns Array of unique categories
     */
    async getCategories(): Promise<string[]> {
        try {
            const { data, error } = await supabase
                .from('company')
                .select('category')
                .not('category', 'is', null);

            if (error) {
                throw new CompanyServiceError('Failed to fetch categories', error);
            }

            const categories = Array.from(
                new Set((data || []).map((row) => row.category).filter(Boolean))
            );

            return categories.sort();
        } catch (error) {
            console.error('Error in getCategories:', error);
            throw error;
        }
    },

    /**
     * Filter companies by multiple criteria
     * 
     * @param filters - Filter criteria
     * @returns Filtered companies
     */
    async filterCompanies(filters: {
        category?: string;
        profitabilityStatus?: string;
        employeeSize?: string;
        remoteWorkPolicy?: string;
    }): Promise<Company[]> {
        try {
            let query = supabase.from('company').select('*');

            if (filters.category) {
                query = query.eq('category', filters.category);
            }

            if (filters.profitabilityStatus) {
                query = query.eq('profitability_status', filters.profitabilityStatus);
            }

            if (filters.employeeSize) {
                query = query.eq('employee_size', filters.employeeSize);
            }

            if (filters.remoteWorkPolicy) {
                query = query.ilike('remote_work_policy', `%${filters.remoteWorkPolicy}%`);
            }

            const { data, error } = await query;

            if (error) {
                throw new CompanyServiceError('Failed to filter companies', error);
            }

            return mapCompanyRows(data || []);
        } catch (error) {
            console.error('Error in filterCompanies:', error);
            throw error;
        }
    },

    /**
     * Get companies with skills data
     * 
     * @returns Companies that have tech stack information
     */
    async getCompaniesWithSkills(): Promise<Company[]> {
        try {
            const { data, error } = await supabase
                .from('company')
                .select('*')
                .not('tech_stack_tools_used', 'is', null)
                .neq('tech_stack_tools_used', '');

            if (error) {
                throw new CompanyServiceError(
                    'Failed to fetch companies with skills',
                    error
                );
            }

            return mapCompanyRows(data || []);
        } catch (error) {
            console.error('Error in getCompaniesWithSkills:', error);
            throw error;
        }
    },
};

export default companyService;
