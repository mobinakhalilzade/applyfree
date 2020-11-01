import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;
  alert: any = {
    message: null,
    return: null
  };
  loading: boolean;
  submited: boolean;
  constructor(
    private service: AccountService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: null,
      password: null
    });
  }

  profile() {
    this.service.profile().subscribe((response: any) => {
      if (response.status == 200) {
        const data = response.body;
        if (data.return == 200) {
          window.location.href = "/dashboard/signatures";
        }
      }
    });
  }

  login(form: any) {
    this.loading = true;
    this.service.login(form).subscribe((response: any) => {
      if (response.status == 200) {
        const data = response.body;
        if (data.return == 200) {
          localStorage.setItem('token', data.data.token);
          window.location.href = "/dashboard/signatures";
        }
        if (data.return == 300) {
          this.loading = false;
          this.alert = data;
        }
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.profile();
    }
  }
}
