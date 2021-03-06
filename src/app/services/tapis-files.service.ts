import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import { ApiService} from 'ng-tapis';
import {RemoteFile} from 'ng-tapis';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TapisFilesService {

  private _listing: ReplaySubject<RemoteFile[]> = new ReplaySubject<RemoteFile[]>(1);
  public readonly listing: Observable<RemoteFile[]> = this._listing.asObservable();
  public readonly IMPORTABLE_FEATURE_ASSET_TYPES: Array<string> = ['jpeg', 'jpg', 'png', 'mp4', 'mov', 'mpeg4', 'webm'];
  public readonly IMPORTABLE_FEATURE_TYPES: Array<string> = ['jpg', 'json', 'geojson', 'gpx'];
  public readonly IMPORTABLE_POINT_CLOUD_TYPES: Array<string> = ['las', 'laz'];
  public readonly IMPORTABLE_OVERLAY_TYPES: Array<string> = ['jpg'];
  public readonly IMPORTABLE_TYPES: Array<string> = ['las', 'laz', 'geotiff', 'tiff', ...this.IMPORTABLE_FEATURE_TYPES];

  constructor(private tapis: ApiService) { }

  checkIfSelectable(file: RemoteFile): boolean {
    if (file.type === 'dir') {return false; }
    const ext = this.getFileExtension(file);
    return this.IMPORTABLE_TYPES.includes(ext);
  }

  public getFileExtension(file: RemoteFile): string {
    return file.name.split('.').pop().toLowerCase();
  }

  listFiles(system: string, path: string) {
    this.tapis.filesList({systemId: system, filePath: path})
      .subscribe(resp => {
        const files = resp.result;
        // This removes the first item in the listing, which in Agave is always a reference to self.
        const current = files.shift();
        current.path = this.getParentPath(current.path);
        current.name = '..';
        files.unshift(current);
        this._listing.next(files);
      });
  }

  private getParentPath(path: string): string {
    const cleaned = path.replace('//', '/');
    const arr = cleaned.split('/');
    arr.pop();
    const parentPath = arr.join('/');
    return parentPath;
  }



}
