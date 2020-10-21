import { Component, OnInit } from "@angular/core";
import { ProductoBajoInventario } from "src/app/models/ProductoBajoInventario";
import { FacturasService } from "src/app/services/facturas.service";

@Component({
  selector: "app-prod-bajo-inv",
  templateUrl: "./prod-bajo-inv.component.html",
  styleUrls: ["./prod-bajo-inv.component.css"],
})
export class ProdBajoInvComponent implements OnInit {
  productosBajosInventario: ProductoBajoInventario[];
  constructor(private srvF: FacturasService) {}

  ngOnInit() {
    this.getProdcutosBajosInventario();
  }
  getProdcutosBajosInventario() {
    this.srvF
      .getProductosBajosEnInventario()
      .subscribe((productosBajoInventario) => {
        this.productosBajosInventario = productosBajoInventario;
        console.log(this.productosBajosInventario);
      });
  }
}
