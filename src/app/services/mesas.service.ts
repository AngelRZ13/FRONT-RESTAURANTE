import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesas } from '../models/mesas.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/mesas';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT + '/crudMesas';



@Injectable({
  providedIn: 'root'
})
export class MesasService {

  constructor(private http:HttpClient) { }

  registrar(data:Mesas):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudPrueba+"/eliminaMesas/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudPrueba+"/listaMesasPorEstadoLike/"+ filtro);
  }

  actualizarCrud(data:Mesas):Observable<any>{
    return this.http.put(baseUrlCrudPrueba+"/actualizaMesas", data);
  }

}
