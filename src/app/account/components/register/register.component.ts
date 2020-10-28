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
  roles = [
    { image: 'assets/images/student.png', id: 1, active: false, name: 'Student', title: 'Im student', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/recruiter.png', id: 3, active: false, name: 'Recruiter', title: 'Im recruiter', description: 'some thing like lorem ipsum' },
  ]

  constructor(
    private service: RegisterService,
    private formBuilder: FormBuilder) {
  }

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
    const command = {
      username: form.username,
      country: form.country.name,
      city: form.city,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      role: this.roleId,
      image: "avatar.jpg"
    };

    this.service.register(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          localStorage.setItem('token', body.token);
          window.location.href = "/dashboard";
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
      username: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required]],
      // country: [defaultCountry, [Validators.required]],
      city: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      terms: [true, [Validators.required]],
    });

  }
}
