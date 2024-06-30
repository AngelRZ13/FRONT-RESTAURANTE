import { Component, Inject } from '@angular/core';
import { Reservas } from '../../models/reserva.model';
import { Sede } from '../../models/sede.model';
import { Usuario } from '../../models/usuario.model';
import { Mesas } from '../../models/mesas.model';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { ServiceReservaService } from '../../services/service-reserva.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AppMaterialModule } from '../../app.material.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-crud-reserva-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-reserva-actualizar.component.html',
  styleUrl: './crud-reserva-actualizar.component.css'
})
export class CrudReservaActualizarComponent {

  reserva:Reservas = {
    fecha_incio_reserva: new Date(),
    mesas:{
      id_mesas: -1,
    },
    estado_reserva: "verificado",
    sede:{
      id_sede: -1,
    },
  }

  lstSede: Sede[] = [];
  objUsuario: Usuario = {};
  lstMesa: Mesas[] = [];

  formRegistrar = this.formBuilder.group({
    validaFecha: ['', [Validators.required]],
    validaCodigo: ['', [Validators.min(1)]],
    validaSede: ['', [Validators.min(1)]],
    // Otros form controls que necesites
  });
  constructor(private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private reservaService: ServiceReservaService,
    @Inject(MAT_DIALOG_DATA) public data: Reservas) {
      this.reserva = data;
        console.log(">>> constructor  >>> ");
     }

     ngOnInit() {
      this.utilService.listaSede().subscribe(
        tipos => this.lstSede = tipos
      );
      this.utilService.ListaMesasPorEstado().subscribe(
        tipos => this.lstMesa = tipos
      );

      this.objUsuario.idUsuario = this.tokenService.getUserId();
      console.log(">>> OnInit >>> 1 >> " + this.lstSede.length);
      console.log(">>> OnInit >>> 1 >> " + this.lstMesa.length);

    }

    actualiza() {
      console.log(">>> registra [inicio]");
      console.log(">>> registra [inicio] " + this.reserva);
      console.log(this.reserva);


      this.reservaService.registrar(this.reserva).subscribe(
        x=>{
              Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
              this.reserva ={
                fecha_incio_reserva: new Date(),
                mesas:{
                  id_mesas: -1,
                },
                estado_reserva: "verificado",
                sede:{
                  id_sede: -1,
                },
              }
          }
      );
 }
}
