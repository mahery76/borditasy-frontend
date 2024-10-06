import { Component, OnInit } from '@angular/core';
import { DepenseService } from 'app/services/depenses/depense.service';
import { Depense } from 'app/models/depense/depense.model';
@Component({
  selector: 'app-depense-list',
  templateUrl: './depense-list.component.html',
  styleUrls: ['./depense-list.component.scss']
})
export class DepenseListComponent implements OnInit {
  depenses: Depense[] = []
  constructor(private depenseService: DepenseService) { }

  ngOnInit(): void {
    this.depenseService.getDepenses().subscribe(data => {
      this.depenses = data;
    })
  }
}
