import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UtilsReportService {
  fechaAc: string;
  dias = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  fecha(): string {
    let date = new Date();
    var fechaNum = date.getDate();
    var mes_name = date.getMonth();
    return (this.fechaAc =
      this.dias[date.getDay() - 1] +
      " " +
      fechaNum +
      " de " +
      this.meses[mes_name] +
      " de " +
      date.getFullYear());
  }

  formateaValor(valor) {
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
  }

  constructor() {}
}
