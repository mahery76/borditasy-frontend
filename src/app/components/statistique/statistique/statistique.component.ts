import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatistiqueService } from 'app/services/statistique/statistique.service';
import { Statistique } from 'app/models/statistique/statistique';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  statistiqueForm: FormGroup;
  statistiques: Statistique[] = [];
  dateOptions: string[] = ['Jour', 'Mois', 'Année'];
  selectedOption: string = 'Jour';
  isBetweenChecked: boolean = false;
  months = [
    { value: 1, name: 'Janvier' },
    { value: 2, name: 'Février' },
    { value: 3, name: 'Mars' },
    { value: 4, name: 'Avril' },
    { value: 5, name: 'Mai' },
    { value: 6, name: 'Juin' },
    { value: 7, name: 'Juillet' },
    { value: 8, name: 'Août' },
    { value: 9, name: 'Septembre' },
    { value: 10, name: 'Octobre' },
    { value: 11, name: 'Novembre' },
    { value: 12, name: 'Décembre' }
  ];
  years: number[] = [];
  totalProfit: number = 0;
  searchParameters: string = '';
  isSearchExpanded: boolean = true;

  constructor(private fb: FormBuilder, private statistiqueService: StatistiqueService) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Months are 0-based in JavaScript
    const currentDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD

    this.statistiqueForm = this.fb.group({
      startDate: [currentDate], // Default to today
      endDate: [''],
      dateOption: [this.selectedOption],
      month: [currentMonth], // Default to current month
      year: [currentYear], // Default to current year
      endMonth: [''],
      endYear: ['']
    });

    this.years = this.generateYearOptions(currentYear); // Generate year options
  }

  ngOnInit(): void {
    // Set default values based on selected option
    this.updateFormDefaults();
  }

  generateYearOptions(currentYear: number): number[] {
    return [currentYear, currentYear - 1, currentYear - 2, currentYear - 3,currentYear -4]; // Generate years in descending order
  }

  updateFormDefaults() {
    if (this.selectedOption === 'Jour') {
      this.statistiqueForm.patchValue({
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        month: '',
        year: '',
        endMonth: '',
        endYear: ''
      });
    } else if (this.selectedOption === 'Mois') {
      this.statistiqueForm.patchValue({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        startDate: '',
        endDate: '',
        endMonth: '',
        endYear: ''
      });
    } else if (this.selectedOption === 'Année') {
      this.statistiqueForm.patchValue({
        year: new Date().getFullYear(),
        startDate: '',
        endDate: '',
        month: '',
        endMonth: '',
        endYear: ''
      });
    }
  }

  onDateOptionChange(option: string) {
    this.selectedOption = option;
    console.log('here is the option=======',)
    this.updateFormDefaults(); // Update form defaults based on the selected option
  }

  onBetweenChange(checked: boolean) {
    this.isBetweenChecked = checked;
    if (!checked) {
      this.statistiqueForm.patchValue({
        endDate: '',
        endMonth: '',
        endYear: ''
      });
    }
  }

  calculateTotalProfit() {
    this.totalProfit = this.statistiques.reduce((sum, stat) => sum + stat.total_profit, 0);
  }

  onSubmit() {
    const { startDate, endDate, dateOption, month, year, endMonth, endYear } = this.statistiqueForm.value;
    let calculatedStartDate = startDate;
    let calculatedEndDate = endDate;

    console.log('here is the month and the year ====> ',this.statistiqueForm.value)

    // Build the search parameters string
    this.searchParameters = `Statistique de `;
    if (dateOption === 'Mois') {
      this.searchParameters += `${this.months[month-1].name} ${year}`;
    } else if (dateOption === 'Année') {
      this.searchParameters += `${year}`;
    } else if (dateOption === 'Jour') {
      this.searchParameters += `${startDate}`;
    }
    
    if (this.isBetweenChecked) {
      this.searchParameters += ` - `;
      if (dateOption === 'Mois') {
        this.searchParameters += `${this.months[endMonth-1].name} ${endYear}`;
      } else if (dateOption === 'Année') {
        this.searchParameters += `${endYear}`;
      } else if (dateOption === 'Jour') {
        this.searchParameters += `${endDate}`;
      }
      
    } 

    if (dateOption === 'Mois') {
      console.log('here is the probleme=====================')
      calculatedStartDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
      calculatedEndDate = new Date(endYear || year, endMonth ? endMonth : month, 0).toISOString().split('T')[0];
      console.log('here is the probleme=====================')
    } else if (dateOption === 'Année') {
      calculatedStartDate = new Date(year, 0, 1).toISOString().split('T')[0];
      calculatedEndDate = new Date(endYear || year, 11, 31).toISOString().split('T')[0];
    }

    // New logic to handle null calculatedEndDate
    if (!calculatedEndDate) {
      if (dateOption === 'Jour') {
        let tempDate = new Date(calculatedStartDate);
        tempDate.setDate(tempDate.getDate() + 1);
        calculatedEndDate = tempDate.toISOString().split('T')[0]; // Add one day to calculatedStartDate
      } else if (dateOption === 'Mois') {
        calculatedEndDate = new Date(year, month, 0).toISOString().split('T')[0]; // Last day of the month
      } else if (dateOption === 'Année') {
        calculatedEndDate = new Date(year, 11, 31).toISOString().split('T')[0]; // 31st December of the year
      }
    }

    if (this.isBetweenChecked && dateOption === 'Jour') {
      calculatedEndDate = endDate;
    }

    this.statistiqueService.getStatistics(calculatedStartDate, calculatedEndDate).subscribe(data => {
      this.statistiques = data;
      this.calculateTotalProfit();
    });
  }

  toggleSearchInputs() {
    this.isSearchExpanded = !this.isSearchExpanded; // Toggle the state
  }
}
