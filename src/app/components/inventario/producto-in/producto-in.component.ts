import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/DB_CONFIG/bdConig';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-in',
  templateUrl: './producto-in.component.html',
  styleUrls: ['./producto-in.component.css']
})
export class ProductoInComponent implements OnInit {
  baseEndpoint = BASE_ENDPOINT + '/productos';
  public nombre_producto:string='Nombre del Producto';
  public producto =new Producto();
  timeout: any = null;
  constructor(private srvP:ProductoService) { }

  ngOnInit() {
    
  }

  public obtenerProducto (codigo:string){
    if (codigo.length>0) {
      this.srvP.getproductoByCodigoBarras(codigo).subscribe(
        producto => {
          this.producto=producto;
          this.nombre_producto=this.producto.nombre;
          console.log(this.producto);
        }
      )
      if (this.producto == null) {
        Swal.fire('Producto No encontrado','','error');
      }
    }
  }

  public guardar():void{
    this.srvP.editarCantidad(this.producto).subscribe(
      producto => {
        Swal.fire('Inventario Producto',`${producto.nombre} con mas cantidad guardada con exito!`,'success');
      }
    )
  }

}
