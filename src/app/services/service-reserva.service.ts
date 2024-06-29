import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Reservas } from '../models/reserva.model';
import { Observable } from 'rxjs';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/reserva';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT + '/crudReserva';


@Injectable({
  providedIn: 'root'
})
export class ServiceReservaService {
  constructor(private http:HttpClient) {

   }
   registrar(data:Reservas):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

  registrarCrud(data:Reservas):Observable<any>{
    return this.http.post(baseUrlCrudPrueba+"/registraReserva", data);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudPrueba+"/listaReservaPorFechaLike/"+ filtro);
  }
}
