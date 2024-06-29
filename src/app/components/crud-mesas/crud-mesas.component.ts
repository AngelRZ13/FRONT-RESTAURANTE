import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { MesasService } from '../../services/mesas.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../../security/token.service';
import { Mesas } from '../../models/mesas.model';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crud-mesas',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-mesas.component.html',
  styleUrl: './crud-mesas.component.css'
})
export class CrudMesasComponent {
  dataSource:any;

  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["id_mesas","estado","capacidad","id_sede", "acciones"];

  filtro: string = "";

  constructor(private dialogService: MatDialog,
    private mesasService: MesasService,
    private tokenService: TokenService ){
}

refreshTable(){
  console.log(">>> refreshTable [ini]");
  var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
  this.mesasService.consultarCrud(msgFiltro).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Mesas>(x);
          this.dataSource.paginator = this.paginator
        }
  );

  console.log(">>> refreshTable [fin]");
}
delete(obj: Mesas) {
  Swal.fire({
  title: '¿Desea eliminar?',
  text: "Los cambios no se van a revertir",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Sí, elimina',
  cancelButtonText: 'No, cancelar'
  }).then((result) => {
        if (result.isConfirmed) {
            this.mesasService.eliminarCrud(obj.id_mesas || 0).subscribe(
                  x => {
                        this.refreshTable();
                        Swal.fire('Mensaje', x.mensaje, 'info');
                  }
            );
        }
  })
  }
  updateEstado(obj: Mesas) {
    console.log(">>> updateEstado [ini]");
    obj.estado = obj.estado == "vacio" ? "ocupado": "vacio";
    this.mesasService.actualizarCrud(obj).subscribe(
    x => {
      this.refreshTable();
    }
    );
    console.log(">>> updateEstado [fin]");
    }
}
