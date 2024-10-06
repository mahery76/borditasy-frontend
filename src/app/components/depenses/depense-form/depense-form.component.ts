import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepenseService } from 'app/services/depenses/depense.service';
import { Router } from '@angular/router';
import { Depense } from 'app/models/depense/depense.model';

@Component({
  selector: 'app-depense-form',
  templateUrl: './depense-form.component.html',
  styleUrls: ['./depense-form.component.scss'],
})
export class DepenseFormComponent{
  depenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private depenseService: DepenseService,
    private router: Router
  ) {
    this.depenseForm = this.fb.group({
      designation_depense: ['', Validators.required],
      quantite_stock: ['', Validators.required],
      prix_achat_dep: ['', Validators.required],
    });
  }


  onSubmit() {
    if(this.depenseForm.valid){
      const formValue: Depense = this.depenseForm.value;
      this.depenseService.addDepense(formValue).subscribe(Response => {
        console.log('depense added', Response)
        this.depenseForm.reset()
        this.router.navigate(['/list_depense'])
      })
    }
    else{
      console.log('form is not valid', this,this.depenseForm.value)
    }
  }
}
