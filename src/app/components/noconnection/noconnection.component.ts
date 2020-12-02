import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConnectionService } from "src/app/services/connection.service";

@Component({
  selector: "app-noconnection",
  templateUrl: "./noconnection.component.html",
  styleUrls: ["./noconnection.component.css"],
})
export class NoconnectionComponent implements OnInit {
  constructor(private router: Router, private conSrv: ConnectionService) {}

  async ngOnInit() {
    if (this.conSrv.online) {
      console.log(this.conSrv.online);
      this.router.navigate(["/home"]);
    }
  }
  public reloadPage() {
    location.reload();
    this.router.navigate(["/home"]);
  }
}
