import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comidas } from '../models/comidas.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/comidas';
const baseUrlConsultaPrueba = AppSettings.API_ENDPOINT + '/consultaComidas';


@Injectable({
  providedIn: 'root'
})
export class ComidasService {

  constructor(private http:HttpClient) { }

  registrar(data:Comidas):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

  consultaComidas(nombres: string, precio: number): Observable<any>{
    console.log('>>> Service >> consultaComidas [inicio]' + nombres);
    return this.http.get<any>(baseUrlConsultaPrueba+'/consultaComplejoComidas?nombres='+nombres + "&precio="+precio );
  }
}
