import { Component, OnInit } from '@angular/core';
import { ContractListService } from './contract-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  form: any = { query: null };
  results: any;
  constructor(private service: ContractListService,
    private routeParams: ActivatedRoute,
    private router: Router) { }

  path() {
    this.router.navigate(['/contracts', this.form.query]);
  }

  search(query: any) {
    this.service.contracts({ query: query }).subscribe((resposne: any) => {
      console.log(resposne);
      if (resposne.status == 200) {
        const body = resposne.body;
        if (body.return == 200) {
          this.results = body.data;
        }
      }
    });
  }

  ngOnInit(): void {
    const query = this.routeParams.snapshot.queryParams.query;
    if (query) {
      this.form.query = query;
      this.search(query);
    }
  }

}
