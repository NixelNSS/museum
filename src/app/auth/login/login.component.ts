import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.login(form.value.email, form.value.password).subscribe(
        response => {
          this.authService.updateCurrentUserAfterAuth(response);
          this.toastService.success("Login successful");
          this.router.navigate(['']);
        },
        () => this.error = "Email and password don't match!"
      );
    }
  }

}
