import { Mesas } from "./mesas.model";
import { Sede } from "./sede.model";

export class Reservas {

  id_reservas?: number;
  fecha_incio_reserva?: Date;
  mesas?: Mesas;
  estado_reserva?:String;
  sede?: Sede;
}
