export interface StatistiqueDashboard {
    months: string[]; // List of month names
    quantities: number[]; // List of quantities for each month
}

// New interface for the API response
export interface StatistiqueApiResponse {
    month: number; // Month number (1-12)
    produit_id: number; // Product ID
    nom_produit: string; // Product name
    total_quantity_sold: number; // Total quantity sold
    total_profit: number; // Total profit
}
