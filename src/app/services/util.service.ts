import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Sede } from '../models/sede.model';
import { Mesas } from '../models/mesas.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }



  listaSede():Observable<Sede[]>{
    return this.http.get<Sede[]>(baseUrlUtil+"/listaSede");
  }

  listaMesas():Observable<Mesas[]>{
    return this.http.get<Mesas[]>(baseUrlUtil+"/listaMesas");
  }

  ListaMesasPorEstado():Observable<Mesas[]>{
    return this.http.get<Mesas[]>(baseUrlUtil+"/listaMesasEstado");
  }

}


