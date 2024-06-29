import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceReservaService } from '../../services/service-reserva.service';

@Component({
  selector: 'app-crud-reserva',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-reserva.component.html',
  styleUrl: './crud-reserva.component.css'
})
export class CrudReservaComponent {

}
