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

  constructor(private fb: FormBuilder, private statistiqueService: StatistiqueService) {
    this.statistiqueForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      dateOption: [this.selectedOption],
      month: [''],
      year: [''],
      endMonth: [''],
      endYear: ['']
    });
  }

  ngOnInit(): void {
  }



  onDateOptionChange(option: string) {
    this.selectedOption = option;
    this.statistiqueForm.patchValue({
      startDate: '',
      endDate: '',
      month: '',
      year: '',
      endMonth: '',
      endYear: ''
    });
    
    // Ensure the form reflects the selected date option
    this.statistiqueForm.get('dateOption')?.setValue(option); // Update the form control
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

  onSubmit() {
    const { startDate, endDate, dateOption, month, year, endMonth, endYear } = this.statistiqueForm.value;
    let calculatedStartDate = startDate;
    let calculatedEndDate = endDate;
    console.log('dateoption: ',dateOption)

    if (dateOption === 'Mois') {
      calculatedStartDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
      calculatedEndDate = new Date(endYear || year, endMonth ? endMonth : month, 0).toISOString().split('T')[0];
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

    console.log('start date: ',calculatedStartDate)
    console.log('end date: ',calculatedEndDate)

    this.statistiqueService.getStatistics(calculatedStartDate, calculatedEndDate).subscribe(data => {
      this.statistiques = data;
    });
  }
}
