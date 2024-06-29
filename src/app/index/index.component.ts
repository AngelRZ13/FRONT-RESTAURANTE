import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenService } from '../security/token.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { ServiceReservaService } from '../services/service-reserva.service';
import { MatDialog } from '@angular/material/dialog';
import { Reservas } from '../models/reserva.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CrudReservaAgregarComponent } from '../components/crud-reserva-agregar/crud-reserva-agregar.component';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  dataSource:any;
  filtro: string = "";

  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  isLogged = false;
  nombreUsuario = "";

  constructor(private dialogService: MatDialog,
    private reservaService: ServiceReservaService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserNameComplete()|| '{}';
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
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
  openDialogRegistra() {
    console.log(">>> openDialogRegistra [ini]");

    if (!this.isLogged) {
      this.router.navigate(['/login']);
    } else {
      const dialogRef = this.dialogService.open(CrudReservaAgregarComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog result: " + result);
        if (result != null && result === 1) {
          this.refreshTable();
        }
      });
    }

    console.log(">>> openDialogRegistra [fin]");
  }
}
