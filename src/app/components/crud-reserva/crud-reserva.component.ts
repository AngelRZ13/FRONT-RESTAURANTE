import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceReservaService } from '../../services/service-reserva.service';
import { MatDialog } from '@angular/material/dialog';
import { MesasService } from '../../services/mesas.service';
import { TokenService } from '../../security/token.service';
import { Reservas } from '../../models/reserva.model';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CrudReservaActualizarComponent } from '../crud-reserva-actualizar/crud-reserva-actualizar.component';

@Component({
  selector: 'app-crud-reserva',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-reserva.component.html',
  styleUrl: './crud-reserva.component.css'
})
export class CrudReservaComponent {
  dataSource:any;

  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["id_reservas","fecha_incio_reserva","id_mesas","estado_reserva", "id_sede", "acciones"];

  filtro: string = "";
  constructor(private dialogService: MatDialog,
    private reservaService: ServiceReservaService,
    private tokenService: TokenService ){
}

refreshTable(){
  console.log(">>> refreshTable [ini]");
  var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
  this.reservaService.consultarCrud(msgFiltro).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Reservas>(x);
          this.dataSource.paginator = this.paginator
        }
  );

  console.log(">>> refreshTable [fin]");
}
openDialogActualiza(obj: Reservas) {
  console.log(">>> openDialogActualiza [ini]");
  const dialogRef = this.dialogService.open(CrudReservaActualizarComponent, {data: obj});
  dialogRef.afterClosed().subscribe(result => {
    console.log("Dialog result: " + result);
      if (result != null && result === 1 ) {
          this.refreshTable();
      }
  });
  console.log(">>> openDialogActualiza [fin]");
  }
delete(obj: Reservas) {
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
            this.reservaService.eliminarCrud(obj.id_reservas || 0).subscribe(
                  x => {
                        this.refreshTable();
                        Swal.fire('Mensaje', x.mensaje, 'info');
                  }
            );
        }
  })
  }
}
