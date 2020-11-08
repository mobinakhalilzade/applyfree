import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { LandingService } from './landing.service';
import { UploadService } from '../helper/upload.service';

declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
 
  sidebar: boolean;
  isBrowser: boolean;
  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: LandingService,
    private uploadService: UploadService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    this.form = this.formBuilder.group({
      fileUpload: null,
      description: null
    });
  }

  upload() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      this.form.fileUpload = { data: fileUpload.files[0] };
      this.fileUpload.nativeElement.value = '';
      this.uploadService.uploader(this.form.fileUpload, 'user/bug', (response: any) => {
        console.log(response);
      })
    };
  }

  reportBug(form: any) {
    console.log(form);
    this.service.reportBug(form).subscribe((response: any) => {
      console.log(response);
    });
  }

  closeModal() {
    $('#info').modal('hide');
    localStorage.setItem('notify', 'yes');
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      if (localStorage.getItem('notify')) {
        $('#info').modal('hide');
      }
      else {
        $('#info').modal('show');
      }
    }
  }
}
