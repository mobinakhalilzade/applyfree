import { Component, OnInit } from '@angular/core';
import { ContractListService } from './contract-list.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  form: any = { query: null };
  constructor(private service: ContractListService) { }

  search() {
    this.service.contracts({ query: this.form.query }).subscribe((resposne: any) => {
      console.log(resposne);
    });
  }

  ngOnInit(): void {
  }

}
