import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  form: FormGroup;
  errors: any = [];
  submited: boolean;
  loading: boolean;

  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  setPassword(form: any) {
    const token = this.route.snapshot.paramMap.get('token');
    const command = {
      token: token,
      password: form.password
    }
    this.service.password(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          localStorage.setItem('token', data.token);
          window.location.href = "/dashboard/signatures";
        }
      }
    })
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]]
    });

  }

}
