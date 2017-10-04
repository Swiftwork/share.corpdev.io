import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AssetService, IAsset } from './shared/asset.service';

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

  public images: IAsset[] = [];
  public videos: IAsset[] = [];
  public code: IAsset[] = [];

  private sort = AssetsComponent.ORDER_NEWEST;

  constructor(
    public assetService: AssetService,
  ) {
    this.uploadForm = new FormGroup({
      'files': new FormControl('', Validators.required),
    });
    this.assetService.getImages().subscribe();
    this.assetService.store.subscribe((assets) => {
      this.images.length = this.videos.length = this.code.length = 0;
      assets.forEach((asset) => {
        switch (asset.mimetype.split('/')[0]) {
          case 'image':
            this.images.push(asset);
            break;
          case 'video':
            this.videos.push(asset);
            break;
          case 'code':
            this.code.push(asset);
            break;
        }
        this.images.sort(this.sort);
        this.videos.sort(this.sort);
        this.code.sort(this.sort);
      });
    });
  }

  ngOnInit() {
  }

  onFilesChange(event: Event) {
    this.files = (event.target as HTMLInputElement).files;
  }

  onUpload(event: Event) {
    if (!this.files || !this.files.length) return;
    this.assetService.upload(this.files).subscribe((response) => {
      console.log(response);
    });
  }

  static ORDER_NEWEST(a: IAsset, b: IAsset) {
    return b.modified.getTime() - a.modified.getTime();
  }
}
