import { Injectable } from '@angular/core';
import {Reperto, HttpReperto, RepertoRelease, HttpRepertoRelease, FotoReperto, HttpFotoReperto} from './RepertiDataModel';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

const REPERTI: Reperto[] = [
  {ID: 0, Nome: 'vaso', Tipo: 'frammento', Valore: 100, Path: 'davide/images/frammentovaso', PathShow: false},
  {ID: 1, Nome: 'tazza', Tipo: 'manico', Valore: 200, Path: 'davide/images/manicotazza', PathShow: false}
];


@Injectable({
  providedIn: 'root'
})
export class DBCRUDService {

  getTest: any;

  serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getReperti() {
    const params = new HttpParams();
    return this.http.get<HttpRepertoRelease[]>(this.serverUrl, {params});
  }

  getFotoRepertoInfo(inputID: number){
    const params = new HttpParams().append('RepertoID', inputID.toString());
    return this.http.get<HttpFotoReperto[]>(this.serverUrl + '/imagesInfo', {params} );
  }

  // getFotoReperto(fotoPath: string){
  //   const params = new HttpParams().append('path', fotoPath);
  //   return this.http.get<Blob>(this.serverUrl + '/search', {params});
  // }

  getFotoReperto(fotoPath: string){
    const params = new HttpParams().append('path', fotoPath);
    return this.http.get(this.serverUrl + 'Automated Ranch Automation Layer.png', {params});
  }


  getRepertiSearch(input: string, field: string) {
    if ((input.localeCompare('') != 0) && (field.localeCompare('') != 0) ) {
      const params = new HttpParams().append('searchString', input).append('searchField', field);
      return this.http.get<HttpRepertoRelease[]>(this.serverUrl + '/search', {params});
    } else {
      return this.http.get<HttpRepertoRelease[]>(this.serverUrl);
    }
  }

  updateReperti(input: RepertoRelease) {

  }

  insertReperti(inputRepertoRelease: RepertoRelease){
    return this.http.post(this.serverUrl, inputRepertoRelease);
  }

  deleteReperto( inputRepertoId: number){
    return this.http.post(this.serverUrl + '/rimuoviReperto', {ID: inputRepertoId});
  }

  postImmagineReperto(fd: FormData, inputID: number ) {
    let headers = new HttpHeaders({'Content-Type':  'multipart/form-data'});
    let request = {
      file: fd,
      RepertoID: inputID
    };
    console.log(request);
    console.log(fd);
    fd.append('RepertoID', inputID.toString());
    return this.http.post(this.serverUrl + '/uploadImmagine', fd);
  }
}
