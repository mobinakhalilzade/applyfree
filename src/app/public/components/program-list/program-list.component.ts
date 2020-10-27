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
    },
    tuition: {
      min: 0,
      max: 0
    },
    costInYear: {
      min: 0,
      max: 0
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
    pageIndex: this.queryParams.page == undefined ? 1 : this.queryParams.page,
    free: this.queryParams.free == undefined ? null : JSON.parse(this.queryParams.free),
    opt: this.queryParams.opt == undefined ? null : JSON.parse(this.queryParams.opt),
    tuition: null,
    living: null
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
          this.inputes.length.result = this.queryParams.length == undefined ? null : this.queryParams.length;

          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getTuition() {
    this.service.tuition().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.inputes.tuition.min = data.min;
          this.inputes.tuition.max = data.max;
        }
      }
    });
  }

  getCostInYear() {
    this.service.costInYear().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.inputes.costInYear.min = data.min;
          this.inputes.costInYear.max = data.max;
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
          this.inputes.category.result = this.queryParams.category == undefined ? this.categories[0]['name'] : this.queryParams.category;
          this.inputes.degree.result = this.queryParams.degree == undefined ? null : this.queryParams.degree;
          if (then != null) {
            then();
          }
        }
      }
    });
  }

  getPrograms(filter: any) {
    const params = {
      category: this.inputes.category.result,
      degree: this.inputes.degree.result,
      length: this.inputes.length.result,
      page: filter.pageIndex,
      opt: filter.opt,
      free: filter.free,
      living: filter.living,
      tuition: filter.tuition
    }

    this.service.programs(params).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.programs = body.data;
          setTimeout(() => {
            this.filterModel.pageIndex = filter.pageIndex;
            this.filterModel.total = body.total;
            this.filterModel.active = true;
            this.loading = false;
          }, 1000);

        }
      }
    });
  }

  pageChange(filter: any) {
    setTimeout(() => {
      if (this.queryParams.page != filter.pageIndex) {
        this.loading = true;
        this.filterModel.active = false;
        this.router.navigate(['.'], {
          relativeTo: this.route, queryParams: {
            page: filter.pageIndex,
            opt: filter.opt,
            free: filter.free,
            tuition: filter.tuition,
            living: filter.living,
            category: this.inputes.category.result,
            degree: this.inputes.degree.result,
            length: this.inputes.length.result
          }
        });
        this.getPrograms(filter);
      }
    }, 100);
  }

  filter() {
    this.loading = true;

    let queryParams = {
      page: 1,
      category: this.inputes.category.result,
      degree: this.inputes.degree.result,
      length: this.inputes.length.result
    };

    if (this.filterModel.tuition != null) {
      queryParams['tuition'] = this.filterModel.tuition;
    }

    if (this.filterModel.living != null) {
      queryParams['living'] = this.filterModel.living;
    }

    if (this.filterModel.opt != null) {
      queryParams['opt'] = this.filterModel.opt;
    }

    if (this.filterModel.free != null) {
      queryParams['free'] = this.filterModel.free;
    }

    this.router.navigate(['.'], {
      relativeTo: this.route, queryParams: queryParams
    });

    this.filterModel.pageIndex = queryParams.page;
    this.getPrograms(this.filterModel);
  }

  ngOnInit() {
    this.getCountries(() => {
      this.getLength(() => {
        this.getCategories(() => {
          this.getPrograms(this.filterModel);
          this.getTuition();
          this.getCostInYear();
        });
      });
    });
  }
}
