export interface AthleteFilter {
    athlete_name: string;
}
export interface YearFilter {
    year: number;
    count: number;
}
export interface AthleteResult {
    event_name: string;
    location: string;
    start_date: string;
    end_date: string;
    position: number;
    sailor_name: string;
    sailor_href: string;
    event_id: number;
}
export interface Event {
    event_id: number;
    event_name: string;
    section: string;
    start_date: string;
    end_date: string;
    category_count: number;
    rider_count: number;
}
export interface HeatData {
    heat_id: number;
    sailor_name: string;
    score: number;
    position: number;
}
export interface ChartData {
    name: string;
    value: number;
    date?: string;
}
export interface APIResponse<T> {
    data: T;
    error?: string;
    status: 'success' | 'error';
}
export interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
//# sourceMappingURL=index.d.ts.map