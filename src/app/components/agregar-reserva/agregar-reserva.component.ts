import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Reservas } from '../../models/reserva.model';
import { Sede } from '../../models/sede.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { ServiceReservaService } from '../../services/service-reserva.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { Mesas } from '../../models/mesas.model';

@Component({
  selector: 'app-agregar-reserva',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './agregar-reserva.component.html',
  styleUrl: './agregar-reserva.component.css'
})
export class AgregarReservaComponent {

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
    private reservaService: ServiceReservaService) { }

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

    registra() {
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
