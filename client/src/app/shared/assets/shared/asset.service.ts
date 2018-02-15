import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AppState } from '../../../app.state';
import { ContentService, IContent } from '../../../core/services/content.service';
import { SocketService } from '../../../core/services/socket.service';

export interface IAsset extends IContent {
  name?: string,
  extension?: string,
  mimetype?: string,
  modified?: Date,
}

export interface ITextualAsset extends IAsset {
  content?: string,
}

export interface IBinaryAsset extends IAsset {
  url?: string,
}

@Injectable()
export class AssetService extends ContentService<IAsset> {

  constructor(
    protected http: HttpClient,
    protected socketService: SocketService,
    protected appState: AppState,
  ) {
    super('assets', http, socketService, appState);
    this.initSocket('assets');
  }

  public upload(files: FileList): Observable<{} | IAsset[]> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append('files[]', file, file.name);
    }
    return this.http.post('/api/assets', formData)
      .catch(this.handleError);
  }

  public getImages(): Observable<{} | IAsset[]> {
    return this.http.get(`/api/assets/images`)
      .map(this.storeData)
      .catch(this.handleError);
  }

  public getVideos(): Observable<{} | IAsset[]> {
    return this.http.get(`/api/assets/videos`)
      .map(this.storeData)
      .catch(this.handleError);
  }

  public getCode(): Observable<{} | IAsset[]> {
    return this.http.get(`/api/assets/code`)
      .map(this.storeData)
      .catch(this.handleError);
  }

  protected format(asset: IAsset) {
    //asset.url = `/content/${asset.id}.${asset.extension}?v=${Date.now()}`;
    return asset;
  }
}
