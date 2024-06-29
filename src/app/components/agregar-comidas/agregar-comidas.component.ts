import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Usuario } from '../../models/usuario.model';
import { Comidas } from '../../models/comidas.model';
import { ComidasService } from '../../services/comidas.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-comidas',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './agregar-comidas.component.html',
  styleUrl: './agregar-comidas.component.css'
})
export class AgregarComidasComponent {
  objUsuario: Usuario = {};

  comidas:Comidas = {
    nombres: "",
    descripcion: "",
    precio: 0
  }
  formRegistrar = this.formBuilder.group({
    Validanombres: ['', [Validators.required, Validators.min(1)]],
    validaDescripcion: ['', [Validators.required, Validators.min(1)]],
    validaPrecio: ['', [Validators.required, Validators.min(1)]],
    // Otros form controls que necesites
  });

  constructor(private comidasService:ComidasService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,) {}

    registra() {
      console.log(">>> registra [inicio]");
          console.log(">>> registra [inicio] " + this.comidas);
          console.log(this.comidas);

          this.comidasService.registrar(this.comidas).subscribe(
            x=>{
                  Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
                  this.comidas ={
                    nombres: "",
                    descripcion: "",
                    precio: 0
                  };
              }
          );
    }
}
