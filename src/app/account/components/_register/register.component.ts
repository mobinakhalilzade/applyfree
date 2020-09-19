import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  roleId: number = 1;
  alert: any = {
    message: null,
    return: null
  };
  submited: boolean;
  loading: boolean;

  constructor(
    private service: RegisterService,
    private formBuilder: FormBuilder) {
  }

  roles = [
    { name: 'student.jpg', id: 1, active: true },
    { name: 'tutor.jpg', id: 2, active: false },
    { name: 'recruiter.png', id: 3, active: false },
    { name: 'translator.jpg', id: 4, active: false },
    { name: 'school.png', id: 5, active: false },
    { name: 'other.jpg', id: 6, active: false }
  ]

  setRole(item: any) {
    const findActiveImage = this.roles.find(x => x.active == true);
    if (findActiveImage != undefined) {
      findActiveImage.active = false;
    }

    item.active = true;
    this.roleId = item.id;
  }

  gerError() { return this.form.controls; }

  register(form: any) {
    this.submited = true;

    if (form.firstName == '' || form.firstName == null) {
      this.form.controls.firstName.setErrors({ 'incorrect': true });
      return;
    }

    if (form.confirmPassword !== form.password) {
      this.form.controls.confirmPassword.setErrors({ 'incorrect': true });
      return;
    }

    this.loading = true;

    const command = {
      username: form.username,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      role: this.roleId,
      image: "avatar.jpg"
    };


    this.service.register(command).subscribe((response: any) => {
      if (response.status == 200) {
        const data = response.body;

        if (data.return == 200) {
          localStorage.setItem('token', data.data.token);
          window.location.href = "/dashboard";
        }

        if (data.return == 300) {
          this.loading = false;
          this.alert = data;
        }
      }
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      terms: [true, [Validators.required]],
    });
  }
}
