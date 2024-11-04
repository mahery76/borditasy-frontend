export enum ChartType {
    Pie = 'Pie',
    Line = 'Line',
    Bar = 'Bar'
}

export interface LegendItem {
    title: string;      // Title of the legend item
    imageClass: string; // CSS class for the legend item icon
}
