import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as countries from 'src/assets/countries.json';

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
  registerForm: boolean = true;
  selectRole: boolean;
  command: any = {};

  country: any;

  constructor(
    private service: RegisterService,
    private formBuilder: FormBuilder) {
  }

  roles = [
    { image: 'assets/images/student.png', id: 1, active: false, name: 'Student', title: 'Im student', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/tutor.png', id: 2, active: false, name: 'Tutor', title: 'Im tutor', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/recruiter.png', id: 3, active: false, name: 'Recruiter', title: 'Im recruiter', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/translator.png', id: 4, active: false, name: 'Translator', title: 'Im translator', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/school.png', id: 5, active: false, name: 'School', title: 'Im school', description: 'some thing like lorem ipsum' },
    { image: 'assets/images/other.png', id: 6, active: false, name: 'Other', title: 'Im other', description: 'some thing like lorem ipsum' }
  ]

  back() {
    this.registerForm = true;
    this.selectRole = false;
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

  register() {
    this.command.role = this.roleId;
    this.service.register(this.command).subscribe((response: any) => {
      if (response.status == 200) {
        const data = response.body;

        if (data.return == 200) {
          localStorage.setItem('token', data.token);
          window.location.href = "/dashboard";
        }

        if (data.return == 300) {
          this.loading = false;
          this.alert = data;
        }
      }
    });
  }

  completeForm(form: any) {
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
    this.registerForm = false;
    this.selectRole = true;

    this.command = {
      username: form.username,
      country: form.country,
      city: form.city,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      image: "avatar.jpg"
    };

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      terms: [true, [Validators.required]],
    });



    this.country = countries['default'];

    console.log(this.country);


  }
}
