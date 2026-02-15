/**
 * Supabase Database Type Definitions
 * Auto-generated from 163-column company schema
 * 
 * IMPORTANT: All fields are text unless otherwise specified
 * Primary key: company_id
 */

export interface CompanyRow {
    // Primary Key
    company_id: string;

    // Company Basics (1-12)
    company_name: string;
    short_name: string;
    logo: string; // URL
    category: string; // Startup, MSME, SMB, Investor, VC
    year_of_incorporation: string;
    overview_of_the_company: string;
    nature_of_company: string; // Private, Public, Subsidiary
    company_headquarters: string;
    countries_operating_in: string; // Composite 1-10
    number_of_offices_beyond_hq: string;
    office_locations: string; // Composite 1-10
    employee_size: string;

    // People & Talent (13-15)
    hiring_velocity: string; // Composite 1-5
    employee_turnover: string;
    average_retention_tenure: string;

    // Business Model (16-20)
    pain_points_being_addressed: string; // Composite 2-8
    focus_sectors_industries: string; // Composite 1-10
    services_offerings_products: string; // Composite 2-10
    top_customers_by_client_segments: string; // Composite 3-20
    core_value_proposition: string; // Composite 2-5

    // Strategy & Culture (21-27)
    vision: string;
    mission: string;
    values: string; // Composite 3-7
    unique_differentiators: string; // Composite 2-6
    competitive_advantages: string; // Composite 2-6
    weaknesses_gaps_in_offering: string; // Composite 1-5
    key_challenges_and_unmet_needs: string; // Composite 2-6

    // Competitive Landscape (28-29)
    key_competitors: string; // Composite 5-20
    technology_partners: string; // Composite 2-8

    // Company Narrative (30-31)
    interesting_facts: string; // Composite 2-3
    recent_news: string; // Composite 2-8

    // Digital Presence (32-43)
    website_url: string; // URL
    quality_of_website: string;
    website_rating: string;
    website_traffic_rank: string; // Composite
    social_media_followers_combined: string;
    glassdoor_rating: string;
    indeed_rating: string;
    google_reviews_rating: string;
    linkedin_profile_url: string; // URL
    twitter_x_handle: string;
    facebook_page_url: string; // URL
    instagram_page_url: string; // URL

    // Leadership (44-48)
    ceo_name: string;
    ceo_linkedin_url: string; // URL
    key_business_leaders: string; // Composite 2-5
    warm_introduction_pathways: string; // Composite 1-5
    decision_maker_accessibility: string;

    // Contact Info (49-54)
    company_contact_email: string;
    company_phone_number: string;
    primary_contact_person_name: string;
    primary_contact_person_title: string;
    primary_contact_person_email: string;
    primary_contact_person_phone_number: string;

    // Reputation (55-57)
    awards_recognitions: string; // Composite 1-8
    brand_sentiment_score: string;
    event_participation: string; // Composite 2-6

    // Risk & Compliance (58-59)
    regulatory_compliance_status: string; // Composite 1-6
    legal_issues_controversies: string;

    // Financials (60-66)
    annual_revenues: string;
    annual_profits: string;
    revenue_mix: string; // Composite
    company_valuation: string;
    year_over_year_growth_rate: string;
    profitability_status: string;
    market_share_percent: string;

    // Funding (67-69)
    key_investors_backers: string; // Composite 2-6
    recent_funding_rounds: string; // Composite 1-5
    total_capital_raised: string;

    // Sustainability (70)
    esg_practices_or_ratings: string; // Composite 1-5

    // Sales & Growth (71-80)
    sales_motion: string;
    customer_acquisition_cost_cac: string;
    customer_lifetime_value_clv: string;
    cac_ltv_ratio: string;
    churn_rate: string;
    net_promoter_score_nps: string;
    customer_concentration_risk: string;
    burn_rate: string;
    runway: string;
    burn_multiplier: string;

    // Innovation (81-83)
    intellectual_property: string; // Composite 1-6
    r_and_d_investment: string;
    ai_ml_adoption_level: string;

    // Operations (84-88)
    tech_stack_tools_used: string; // Composite 3-10
    cybersecurity_posture: string; // Composite 1-4
    supply_chain_dependencies: string; // Composite 1-5
    geopolitical_risks: string; // Composite 1-4
    macro_risks: string; // Composite 1-4

    // People & Talent (89-91)
    diversity_metrics: string; // Composite
    remote_work_policy: string;
    training_development_spend: string;

    // Market (92-93)
    partnership_ecosystem: string; // Composite 2-8
    exit_strategy_history: string; // Composite 1-3

    // Sustainability (94-95)
    carbon_footprint_environmental_impact: string;
    ethical_sourcing_practices: string; // Composite 1-4

    // Benchmarking (96-97)
    benchmark_vs_peers: string; // Composite 3-6
    future_projections: string;

    // Forecasting (98)
    strategic_priorities: string; // Composite 3-5

    // Network (99)
    industry_associations_memberships: string; // Composite 2-6

    // Proof Points (100-101)
    case_studies_public_success_stories: string; // Composite 2-5
    go_to_market_strategy: string; // Composite 3-6

    // Innovation (102-103)
    innovation_roadmap: string; // Composite 2-6
    product_pipeline: string; // Composite 2-6

    // Governance (104)
    board_of_directors_advisors: string; // Composite 3-8

    // Digital Presence (105-107)
    company_introduction_marketing_videos: string; // URL, Composite 1-5
    customer_testimonial: string; // Composite 2-5
    industry_benchmark_technology_adoption_rating: string; // Composite 2-3

    // Market (108-110)
    total_addressable_market_tam: string;
    serviceable_addressable_market_sam: string;
    serviceable_obtainable_market_som: string;

    // Culture & People (111-116)
    work_culture: string; // Composite 1-3
    manager_quality: string;
    psychological_safety: string;
    feedback_culture: string; // Composite 1-2
    diversity_inclusion: string; // Composite 1-5
    ethical_standards: string; // Composite 1-3

    // Work-Life Balance & Work Patterns (117-122)
    typical_working_hours: string;
    overtime_expectations: string;
    weekend_work: string;
    remote_hybrid_onsite_flexibility: string; // Composite 1-3
    leave_policy: string; // Composite 1-4
    burnout_risk: string;

    // Location, Commute & Accessibility (123-127)
    central_vs_peripheral_location: string;
    public_transport_access: string; // Composite 1-4
    cab_availability_and_company_cab_policy: string; // Composite 1-3
    commute_time_from_airport: string;
    office_zone_type: string;

    // Safety & Well-being (128-132)
    area_safety: string; // Composite 1-2
    company_safety_policies: string; // Composite 1-4
    office_infrastructure_safety: string; // Composite 1-3
    emergency_response_preparedness: string; // Composite 1-4
    health_support: string; // Composite 1-5

    // Learning & Growth Opportunities (133-139)
    onboarding_and_training_quality: string;
    learning_culture: string; // Composite 1-4
    exposure_quality: string;
    mentorship_availability: string; // Composite 1-3
    internal_mobility: string;
    promotion_clarity: string; // Composite 1-3
    tools_and_technology_access: string; // Composite 1-5

    // Role & Work Quality (140-145)
    role_clarity: string;
    early_ownership: string;
    work_impact: string; // Composite 1-3
    execution_vs_thinking_balance: string;
    automation_level: string;
    cross_functional_exposure: string; // Composite 1-4

    // Company Stability & Reputation (146-149)
    company_maturity: string;
    brand_value: string;
    client_quality: string; // Composite 1-5
    layoff_history: string;

    // Compensation & Benefits (150-155)
    fixed_vs_variable_pay: string;
    bonus_predictability: string;
    esops_and_long_term_incentives: string; // Composite 1-3
    family_health_insurance: string; // Composite 1-4
    relocation_support: string; // Composite 1-3
    lifestyle_and_wellness_benefits: string; // Composite 1-6

    // Long-Term Career Signaling (156-160)
    exit_opportunities: string; // Composite 1-5
    skill_relevance: string;
    external_recognition: string;
    network_strength: string; // Composite 1-3
    global_exposure: string; // Composite 1-3

    // Values Alignment (161-163)
    mission_clarity: string;
    sustainability_and_csr: string; // Composite 1-3
    crisis_behavior: string;
}

/**
 * Database schema type for Supabase client
 */
export type Database = {
    public: {
        Tables: {
            company: {
                Row: CompanyRow;
                Insert: CompanyRow;
                Update: Partial<CompanyRow>;
            };
        };
    };
};
