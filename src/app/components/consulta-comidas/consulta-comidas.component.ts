import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { ComidasService } from '../../services/comidas.service';

@Component({
  selector: 'app-consulta-comidas',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-comidas.component.html',
  styleUrl: './consulta-comidas.component.css'
})
export class ConsultaComidasComponent {

  nombres: string = "";
  precio : number = 0;

  dataSource: any;

  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["nombres","descripcion","precio"];

  constructor(private comidasService: ComidasService,) {
}

  consultar() {
    console.log(">>> consultar [ini]");
    console.log("nombres: ", this.nombres);
    console.log("precio: ", this.precio);


    this.comidasService.consultaComidas(this.nombres,
    this.precio.toString() == "" ? -1 : this.precio).subscribe(
      data => {
        this.dataSource = data;
        this.dataSource.paginator = this.paginator;
      }
    );
    console.log(">>> consultar [fin]");
  }

}
