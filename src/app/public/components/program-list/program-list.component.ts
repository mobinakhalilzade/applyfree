import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../public.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})

export class ProgramListComponent implements OnInit {
  inputes = {
    category: {
      value: '',
      result: null
    },
    subCategory: {
      value: '',
      result: null
    },
    degree: {
      value: '',
      result: null
    },
    length: {
      value: '',
      result: null
    },
    country: {
      value: '',
      result: null
    },
    city: {
      value: '',
      result: null
    },
    university: {
      value: '',
      result: null
    },
    type: {
      value: '',
      result: null
    }
  }

  //-----------
  loading: boolean = true;
  countries: any;
  lengths: any;
  categories: any;
  programs: any;

  queryParams = this.route.snapshot.queryParams;

  filterModel = {
    active: false,
    total: 0,
    pageSize: 12,
    pageIndex: 1,
    opt: this.queryParams.opt == undefined ? null : JSON.parse(this.queryParams.opt)
  }

  constructor(private service: PublicService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  getCountries(then = null) {
    this.service.countries().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.countries = body.data;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getLength(then = null) {
    this.service.length().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.lengths = body.data;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getCategories(then = null) {
    this.service.categories().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.categories = body.data;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getPrograms(filter: any) {
    const params = {
      page: filter.pageIndex,
      opt: filter.opt
    }

    this.service.programsByPage(params).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.programs = body.data;

          setTimeout(() => {
            this.filterModel.pageIndex = filter.pageIndex;
            this.filterModel.total = body.total;
            this.filterModel.active = true;
          }, 500);
          this.loading = false;
        }
      }
    });
  }

  pageChange(model: any) {
    console.log('run from change')
    this.loading = true;
    this.filterModel.active = false;
    setTimeout(() => {
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: model.pageIndex, opt: this.filterModel.opt } });
      this.getPrograms(model);
    }, 100);
  }

  filter() {
    setTimeout(() => {
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: 1, opt: this.filterModel.opt } });
      this.getPrograms(this.filterModel);
    }, 100);

  }

  ngOnInit() {

    this.getCountries(() => {
      this.getLength(() => {
        this.getCategories(() => {
          if (this.queryParams.page == undefined || this.queryParams.page == 'NaN') {
            console.log('run from int')
            this.getPrograms(1)
          } else {
            this.filterModel.pageIndex = this.queryParams.page;
            this.pageChange(this.filterModel);
          }
        });
      });
    });
  }
}
