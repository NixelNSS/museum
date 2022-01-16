import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  error: string;

  constructor(
    private authService: AuthService, private dialog: MatDialog,
    private toastService: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (form.valid && form.value.password === form.value.confirmPassword) {
      const dialog = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          content: "change your password"
        }
      });
      dialog.afterClosed().subscribe(result => {
        if (result) {
          this.authService.changePassword(form.value.oldPassword, form.value.password).subscribe(
            () => {
              this.toastService.success("Password changed successfully!");
              this.router.navigate(['']);
            },
            () => this.error = "Old password doesn't match!"
          );
        }
      });
    } else {
      this.error = "Passwords don't match!";
    }
  }

}
