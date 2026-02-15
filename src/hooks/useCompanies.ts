/**
 * React Hooks for Company Data
 * 
 * Provides React Query hooks for fetching company data
 * Includes automatic caching, loading states, and error handling
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { companyService } from '@/services/companyService';
import type { Company } from '@/data/companies';

/**
 * Hook to fetch all companies
 * 
 * @example
 * ```tsx
 * const { data: companies, isLoading, error } = useCompanies();
 * ```
 */
export function useCompanies(options?: {
    limit?: number;
    offset?: number;
}): UseQueryResult<Company[], Error> {
    return useQuery({
        queryKey: ['companies', options],
        queryFn: () => companyService.getAllCompanies(options),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

/**
 * Hook to fetch a single company by ID
 * 
 * @param id - Company ID
 * 
 * @example
 * ```tsx
 * const { data: company, isLoading } = useCompany(companyId);
 * ```
 */
export function useCompany(
    id: string | undefined
): UseQueryResult<Company | null, Error> {
    return useQuery({
        queryKey: ['company', id],
        queryFn: () => companyService.getCompanyById(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

/**
 * Hook to fetch companies by category
 * 
 * @param category - Company category
 * 
 * @example
 * ```tsx
 * const { data: companies } = useCompaniesByCategory('Startup');
 * ```
 */
export function useCompaniesByCategory(
    category: string | undefined
): UseQueryResult<Company[], Error> {
    return useQuery({
        queryKey: ['companies', 'category', category],
        queryFn: () => companyService.getCompaniesByCategory(category!),
        enabled: !!category,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Hook to search companies
 * 
 * @param query - Search query string
 * 
 * @example
 * ```tsx
 * const { data: results } = useCompanySearch(searchTerm);
 * ```
 */
export function useCompanySearch(
    query: string
): UseQueryResult<Company[], Error> {
    return useQuery({
        queryKey: ['companies', 'search', query],
        queryFn: () => companyService.searchCompanies(query),
        enabled: query.length > 0,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

/**
 * Hook to compare multiple companies
 * 
 * @param ids - Array of company IDs
 * 
 * @example
 * ```tsx
 * const { data: companies } = useCompareCompanies(['id1', 'id2']);
 * ```
 */
export function useCompareCompanies(
    ids: string[]
): UseQueryResult<Company[], Error> {
    return useQuery({
        queryKey: ['companies', 'compare', ids],
        queryFn: () => companyService.compareCompanies(ids),
        enabled: ids.length > 0,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Hook to fetch company statistics
 * 
 * @example
 * ```tsx
 * const { data: stats } = useCompanyStats();
 * ```
 */
export function useCompanyStats(): UseQueryResult<
    {
        totalCount: number;
        byCategory: Record<string, number>;
        byProfitability: Record<string, number>;
        byHiringVelocity: Record<string, number>;
    },
    Error
> {
    return useQuery({
        queryKey: ['companies', 'stats'],
        queryFn: () => companyService.getCompanyStats(),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
}

/**
 * Hook to fetch available categories
 * 
 * @example
 * ```tsx
 * const { data: categories } = useCategories();
 * ```
 */
export function useCategories(): UseQueryResult<string[], Error> {
    return useQuery({
        queryKey: ['companies', 'categories'],
        queryFn: () => companyService.getCategories(),
        staleTime: 15 * 60 * 1000, // 15 minutes
    });
}

/**
 * Hook to filter companies
 * 
 * @param filters - Filter criteria
 * 
 * @example
 * ```tsx
 * const { data: companies } = useFilteredCompanies({
 *   category: 'Startup',
 *   profitabilityStatus: 'Profitable'
 * });
 * ```
 */
export function useFilteredCompanies(filters: {
    category?: string;
    profitabilityStatus?: string;
    employeeSize?: string;
    remoteWorkPolicy?: string;
}): UseQueryResult<Company[], Error> {
    return useQuery({
        queryKey: ['companies', 'filter', filters],
        queryFn: () => companyService.filterCompanies(filters),
        enabled: Object.values(filters).some((v) => v !== undefined),
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Hook to fetch companies with skills data
 * 
 * @example
 * ```tsx
 * const { data: companies } = useCompaniesWithSkills();
 * ```
 */
export function useCompaniesWithSkills(): UseQueryResult<Company[], Error> {
    return useQuery({
        queryKey: ['companies', 'with-skills'],
        queryFn: () => companyService.getCompaniesWithSkills(),
        staleTime: 10 * 60 * 1000,
    });
}
