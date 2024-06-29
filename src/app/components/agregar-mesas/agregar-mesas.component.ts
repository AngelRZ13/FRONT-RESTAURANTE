import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Sede } from '../../models/sede.model';
import { Mesas } from '../../models/mesas.model';
import { MesasService } from '../../services/mesas.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-agregar-mesas',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './agregar-mesas.component.html',
  styleUrl: './agregar-mesas.component.css'
})
export class AgregarMesasComponent {
  objUsuario: Usuario = {};

  lstSede: Sede[] = [];
  mesas:Mesas = {
    estado: "vacio",
    capacidad: "",
    sede: {
      id_sede: -1,
    }
  }

  formRegistrar = this.formBuilder.group({
    validaSede: ['', [Validators.required, Validators.min(1)]],
    validaCapacidad: ['', [Validators.required, Validators.min(1)]],
    // Otros form controls que necesites
  });

  constructor(private mesasService:MesasService ,
    private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,) {}

    ngOnInit() {
      this.utilService.listaSede().subscribe(
        tipos => this.lstSede = tipos
      )
      this.objUsuario.idUsuario = this.tokenService.getUserId();

    }

    registra() {
      console.log(">>> registra [inicio]");
          console.log(">>> registra [inicio] " + this.mesas);
          console.log(this.mesas);

          this.mesasService.registrar(this.mesas).subscribe(
            x=>{
                  Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
                  this.mesas ={
                    estado: "vacio",
                    capacidad: "",
                    sede: {
                      id_sede: -1,
                    }
                  };
              }
          );
    }
}
