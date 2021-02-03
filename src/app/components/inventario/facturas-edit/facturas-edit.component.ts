import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Factura } from "src/app/models/factura";
import { FacturasService } from "src/app/services/facturas.service";

@Component({
  selector: "app-facturas-edit",
  templateUrl: "./facturas-edit.component.html",
  styleUrls: ["./facturas-edit.component.css"],
})
export class FacturasEditComponent implements OnInit {
  public factura = new Factura();
  public usuarioVendedor: string = null;
  constructor(
    private srvf: FacturasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarfactura();
  }

  public async cargarfactura() {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get("id");
      if (id) {
        this.srvf.getFacturaById(id).subscribe((factura) => {
          this.factura = factura;
          this.usuarioVendedor = this.factura.usuario.username;
        });
      }
    });
  }
}
