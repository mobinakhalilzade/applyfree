import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FooterService } from './footer.service';
import { UploadService } from '../helper/upload.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;

  form: any;

  constructor(
    private service: FooterService,
    private uploadService: UploadService,
    private formBuilder: FormBuilder
  ) { 
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
      })
    };
  }

  reportBug(form: any) {
    this.service.reportBug(form).subscribe((response: any) => {
    });
  }

  ngOnInit(): void {
  }

}
