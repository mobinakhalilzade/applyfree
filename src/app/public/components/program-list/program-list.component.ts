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

  filterModel = {
    active: false,
    total: 0,
    pageSize: 12,
    pageIndex: 1
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

  getPrograms(page: any) {
    const params = {
      page: page
    }

    this.service.programsByPage(params).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.programs = body.data;
          this.filterModel.total = body.pages;
          this.loading = false;
          setTimeout(() => {
            this.filterModel.active = true;
          }, 100);
        }
      }
    });
  }

  pageChange(model: any) {
    this.filterModel.active = false;
    setTimeout(() => {
      console.log(model.pageIndex)
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: model.pageIndex } });
      this.getPrograms(model.pageIndex);
    }, 100);

  }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;

    this.getCountries(() => {
      this.getLength(() => {
        this.getCategories(() => {
          const page = queryParams.page;
          this.filterModel.pageIndex = page;
          this.getPrograms(page == undefined ? 1 : page);
        });
      });
    });
  }
}
