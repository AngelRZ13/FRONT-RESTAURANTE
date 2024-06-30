import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { IndexComponent } from './index/index.component';

import { AgregarReservaComponent } from './components/agregar-reserva/agregar-reserva.component';
import { ConsultaComidasComponent } from './components/consulta-comidas/consulta-comidas.component';
import { CrudMesasComponent } from './components/crud-mesas/crud-mesas.component';
import { AgregarMesasComponent } from './components/agregar-mesas/agregar-mesas.component';
import { AgregarComidasComponent } from './components/agregar-comidas/agregar-comidas.component';
import { CrudReservaComponent } from './components/crud-reserva/crud-reserva.component';


export const routes: Routes = [
    {path:"verRegistroComidas", component:AgregarComidasComponent },
    {path:"verRegistroMesas", component:AgregarMesasComponent },
    {path:"verRegistroReserva", component:AgregarReservaComponent },

    {path:"verConsultaComida", component:ConsultaComidasComponent },

    {path:"verCrudReservas", component:CrudReservaComponent },
    {path:"verCrudMesas", component:CrudMesasComponent },
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];

