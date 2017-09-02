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
  version: number,
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
    this.get().subscribe(this.storeAssets.bind(this));
  }

  private initSocket() {
    this.socketService.socket.on('assets', (assetId: string) => {
      this.get(assetId).subscribe(this.storeAssets.bind(this));
    });
  }

  public upload(files: FileList): Observable<{} | IAsset[]> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append('files[]', file, file.name);
    }
    return this.http.post('/api/assets', formData)
      .map((response: IAsset[]) => {
        return response;
      })
      .catch(this.handleError.bind(this));
  }

  public get(id?: string): Observable<{} | IAsset | IAsset[]> {
    return this.http.get(id ? `/api/assets/${id}` : `/api/assets/`)
      .catch(this.handleError.bind(this));
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
        asset.version = cachedAsset && cachedAsset.version ? cachedAsset.version + 1 : 1;
        asset.url = this.formatUrl(asset);
        cached.set(asset.id, asset);
      });
    } else {
      const asset = data as IAsset;
      const cachedAsset = cached.get(asset.id);
      asset.version = cachedAsset && cachedAsset.version ? cachedAsset.version + 1 : 1;
      asset.url = this.formatUrl(asset);
      cached.set(asset.id, asset);
    }
    this._assets.next(cached);
  }

  private formatUrl(asset: IAsset) {
    return `/${process.env.CONTENT_DIR}/${asset.id}.${asset.extension}?version=${asset.version}`;
  }
}
