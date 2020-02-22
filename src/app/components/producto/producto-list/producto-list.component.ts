import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  constructor( private categoriaService: CategoriasService ) { }
  categoriaLista: Categoria[];
  ngOnInit() {
    this.categoriaService.getCategorias().subscribe( data => {
      // console.log(data);
      this.categoriaLista = data;
    });
  }

}
