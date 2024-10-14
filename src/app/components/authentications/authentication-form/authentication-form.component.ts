import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authentications/authentication.service';
import { Router } from '@angular/router'; 
import { User } from 'app/models/users/user.model';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss'],
})
export class AuthenticationFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: User = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.authService.setLoggedInUser(response);
          console.log(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error(error);
          alert('mot de passe ou nom incorrecte');
          // show error message
        },
      });
    }
  }
}
