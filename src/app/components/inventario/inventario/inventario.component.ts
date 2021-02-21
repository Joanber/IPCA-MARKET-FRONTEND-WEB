import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/login_services/auth.service";

@Component({
  selector: "app-inventario",
  templateUrl: "./inventario.component.html",
  styleUrls: ["./inventario.component.css"],
})
export class InventarioComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}
}
