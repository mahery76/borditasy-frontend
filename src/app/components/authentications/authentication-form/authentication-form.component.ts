import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/users/user.service';
import { Router } from '@angular/router'; // Import Router
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
          alert('mila redirigena eto fa mety ny connexion');
          console.log(response);
        },
        error: (error) => {
          console.error(error);
          alert('connection error');
          // show error message
        },
      });
    }
  }
}
