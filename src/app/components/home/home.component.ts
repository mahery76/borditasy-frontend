import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/services/products/product.service';
import { StatistiqueService } from 'app/services/statistique/statistique.service';
import { StatistiqueDashboard } from 'app/models/statistique/statistique-dashboard'; // Import the new model
import { ChartType,LegendItem } from '../lbd/lbd-chart/lbd-chart.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public products: any[] = [];
  public selectedProduct: number;
  public selectedProductName: string;
  public selectedYear: number;
  public years: number[] = [];
  public chartData: any;
  public chartType: ChartType = ChartType.Line; // Change to your desired chart type
  public legendItems: LegendItem[] = [{ title: 'Quantity Sold', imageClass: 'fa fa-circle text-info' }];

  constructor(private productService: ProductService, private statistiqueService: StatistiqueService) {
    this.selectedYear = new Date().getFullYear(); // Default to current year
    this.years = Array.from({ length: 5 }, (_, i) => this.selectedYear - i); // Last 5 years
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      if (this.products.length > 0) {
        this.selectedProduct = this.products[0].id; // Default to the first product
        this.selectedProductName = this.products[0].nom_produit; // Set the default product name
      }
    });
  }

  onSubmit(): void {
    // Find the selected product name based on the selected product ID
    const selectedProduct = this.products.find(product => product.id == this.selectedProduct);
    this.selectedProductName = selectedProduct ? selectedProduct.nom_produit : ''; // Set the selected product name

    this.statistiqueService.getStatisticsDashboard(this.selectedProduct, this.selectedYear).subscribe((data: StatistiqueDashboard) => {
        // Recreate chartData as a new object
        this.chartData = {
            labels: data.months,
            series: [data.quantities]
        };
        console.log('here is the chart : ', this.chartData);
    });
}
}
