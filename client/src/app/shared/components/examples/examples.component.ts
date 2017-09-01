import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetService } from '../../../core/services/asset.service';

export interface IImage {
  url: string,
  name: string,
}

@Component({
  selector: 'c-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css'],
  host: {
    '[class.c-examples]': 'true',
  },
})
export class ExamplesComponent implements OnInit {
  @ViewChild('filesInput') filesInput: ElementRef;

  public uploadForm: FormGroup;
  public test: any;

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

  onUpload(event: Event) {
    const files: FileList = this.filesInput.nativeElement.files;
    console.log(this.filesInput.nativeElement.files);
    if (!files.length) return;
    this.assetService.upload(files).subscribe((response) => {
      console.log(response);
    });
  }

}
