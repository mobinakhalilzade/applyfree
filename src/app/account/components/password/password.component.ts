import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder
  ) { }

  newPassword(form:any){
    const command={
      password:form.password
    }
    this.service.newPassword(command).subscribe((response:any)=>{
    })
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      username: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      terms: [true, [Validators.required]],
    });

  }

}
