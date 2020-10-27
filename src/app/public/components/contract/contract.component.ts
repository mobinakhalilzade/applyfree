import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  signContract() {
    let logedIn = localStorage.getItem('token');
    if (logedIn) {
      // do something
    }
    else {
      this.router.navigate(['/account/login']);
    }
  }

  ngOnInit(): void {
  }

}
