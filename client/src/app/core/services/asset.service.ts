import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '_debugger';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { AppState } from '../../app.state';
import { SocketService } from '../../core/services/socket.service';

export interface IAsset {
  id: string,
  name: string,
  extension: string,
  url: string,
  mimetype: string,
  modified: Date,
}

@Injectable()
export class AssetService {

  private _assets: BehaviorSubject<Map<string, IAsset>> = new BehaviorSubject<Map<string, IAsset>>(
    new Map<string, IAsset>(),
  );
  public assets: Observable<Map<string, IAsset>> = this._assets.asObservable();

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private appState: AppState,
  ) {
    this.initSocket();

    /* Bind */
    this.storeAssets = this.storeAssets.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  private initSocket() {
    this.socketService.socket.on('assets', (assetId: string) => {
      const cached = this._assets.getValue();
      cached.delete(assetId);
      this.get(assetId).subscribe(this.storeAssets);
    });
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

  public get(id?: string): Observable<{} | IAsset | IAsset[]> {
    const cached = this._assets.getValue();
    if (cached.has(id))
      return Observable.of(cached.get(id));
    return this.http.get(id ? `/api/assets/${id}` : `/api/assets/`)
      .map(this.storeAssets)
      .catch(this.handleError);
  }

  public getImages(): Observable<{} | IAsset[]> {
    return this.http.get(`/api/assets/images`)
      .map(this.storeAssets)
      .catch(this.handleError);
  }

  public getVideos(): Observable<{} | IAsset[]> {
    return this.http.get(`/api/assets/videos`)
      .map(this.storeAssets)
      .catch(this.handleError);
  }

  public getCode(): Observable<{} | IAsset[]> {
    return this.http.get(`/api/assets/code`)
      .map(this.storeAssets)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.of<{} | IAsset | IAsset[]>(null);
  }

  private storeAssets(data: IAsset | IAsset[]) {
    const cached = this._assets.getValue();
    if (Array.isArray(data)) {
      const assets = data as IAsset[];
      (assets as IAsset[]).forEach(asset => {
        const cachedAsset = cached.get(asset.id);
        asset.url = this.formatUrl(asset);
        asset.modified = new Date(asset.modified);
        cached.set(asset.id, asset);
      });
    } else {
      const asset = data as IAsset;
      const cachedAsset = cached.get(asset.id);
      asset.url = this.formatUrl(asset);
      asset.modified = new Date(asset.modified);
      cached.set(asset.id, asset);
    }
    this._assets.next(cached);
    return data;
  }

  private formatUrl(asset: IAsset) {
    return `/content/${asset.id}.${asset.extension}?v=${Date.now()}`;
  }
}
