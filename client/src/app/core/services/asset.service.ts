import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export interface IFile {
  name: string,
  url: string,
}

export interface IUploadResponse {
  files: IFile,
}

@Injectable()
export class AssetService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  upload(files: FileList): Observable<{} | FileList> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append('files[]', file, file.name);
    }
    return this.httpClient.post('/api/assets', formData)
      .map((response: IUploadResponse) => {
        return response;
      })
      .catch(this.handleError.bind(this));
  }

  handleError(error: any) {
    console.error(error);
    return Observable.of<{} | IUploadResponse>(null);
  }
}
