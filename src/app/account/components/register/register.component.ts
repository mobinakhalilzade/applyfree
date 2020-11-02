import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  roles = [
    { id: 1, active: true, name: "I'm student" },
    { id: 2, active: false, name: "I'm adviser" }
  ]

  alert: any = {
    message: null,
    return: null
  };

  errors: any = [];
  submited: boolean;
  loading: boolean;

  constructor(
    private service: AccountService,
    private formBuilder: FormBuilder) {

  }

  getError() {
    if (this.form.controls.password.errors !== null) {
      this.errors.push("Your password must include at least 6 characters");
    }
    if (this.form.controls.password.value !== this.form.controls.confirmPassword.value) {
      this.errors.push("Your confirmPassword must exactly match with password");
    }
    if (this.form.controls.phone.errors !== null) {
      this.errors.push("Not a valid phone number");
    }
    if (this.form.controls.username.errors !== null) {
      this.errors.push("Not a valid email address");
    }
  }

  register(form: any) {
    const command = {
      username: form.username,
      phone: form.phone,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      role: form.id,
      image: "avatar.jpg"
    };

    this.getError();
    if (this.errors.length !== 0) {
      return
    }
    this.service.register(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          localStorage.setItem('token', body.token);
          window.location.href = "/dashboard/signatures";
        }
        if (body.return == 300) {
          this.loading = false;
          this.alert = body;
        }
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      username: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: [null, [Validators.required, Validators.pattern("^\\+[0-9]*$")]],
      terms: [true, [Validators.required]],
      role: [1]
    });
  }
}
