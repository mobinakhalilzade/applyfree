import { Component, OnInit } from '@angular/core';
import { ContractListService } from './contract-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  form: any = { in: 'students', filter: 1, type: 1, days: 15 };
  results: any;
  contracts = [
    { id: 1, title: 'students', description: 'I want to find student contract' },
    { id: 2, title: 'schools', description: 'I want to find Schools contract' },
    { id: 3, title: 'translators', description: 'I want to find Translators contract' },
    { id: 4, title: 'tutors', description: 'I want to find Tutors contract' },
    { id: 5, title: 'recruiters', description: 'I want to find Recruiters contract' },
    { id: 6, title: 'parents', description: 'I want to find Parents contract' }
  ];

  constructor(private service: ContractListService,
    private routeParams: ActivatedRoute,
    private router: Router) {
  }

  search() {
    this.service.contracts({ filter: this.form.filter, type: this.form.type, expire: this.form.days }).subscribe((resposne: any) => {
      if (resposne.status == 200) {
        const body = resposne.body;
        if (body.return == 200) {
          this.results = body.data;
        }
      }
    });
  }

  reload() {
    window.location.href = `/contracts?filter=${this.form.filter}&type=${this.form.type}`;
  }

  ngOnInit(): void {
    const filter = this.routeParams.snapshot.queryParams.filter;

    if (filter) {
      this.form.filter = parseInt(filter);

      const findByFilter = this.contracts.find(x => x.id == filter);
      if (findByFilter) {
        this.form.in = findByFilter.title;
      }
    }

    const type = this.routeParams.snapshot.queryParams.type;

    if (type) {
      this.form.type = parseInt(type);
    }

    this.search();
  }
}
