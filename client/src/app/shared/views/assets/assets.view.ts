import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { BaseView } from '../../../core/base/base.view';
import { AssetService, IAsset } from '../../services/asset.service';

export interface IImage {
  url: string,
  name: string,
}

@Component({
  selector: 'v-assets',
  templateUrl: './assets.view.html',
  styleUrls: ['./assets.view.css'],
  host: {
    '[class.v-assets]': 'true',
  },
})
export class AssetsView extends BaseView implements OnInit {

  public uploadForm: FormGroup;
  public files: FileList;

  public images: IAsset[] = [];
  public videos: IAsset[] = [];
  public code: IAsset[] = [];

  private sort = AssetsView.ORDER_NEWEST;

  constructor(
    public assetService: AssetService,
  ) {
    super();
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
