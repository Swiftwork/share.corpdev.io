import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetService } from '../../../core/services/asset.service';

export interface IImage {
  url: string,
  name: string,
}

@Component({
  selector: 'c-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css'],
  host: {
    '[class.c-assets]': 'true',
  },
})
export class AssetsComponent implements OnInit {
  public uploadForm: FormGroup;
  public files: FileList;

  public images: IImage[] = [];

  constructor(
    public assetService: AssetService,
  ) {
    this.uploadForm = new FormGroup({
      'files': new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  onFilesChange(event: Event) {
    this.files = (event.target as HTMLInputElement).files;
  }

  onUpload(event: Event) {
    console.log(this.files);
    if (!this.files.length) return;
    this.assetService.upload(this.files).subscribe((response) => {
      console.log(response);
    });
  }

}
