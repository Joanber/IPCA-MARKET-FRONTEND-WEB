import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from '../../../services/categorias.service'


@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  constructor( private categoriaSer: CategoriasService ) { }
  categoriaList: Categoria;
  ngOnInit() {
    this.categoriaSer.getCategorias().subscribe( categoria => {
      this.categoriaList = categoria;
      // console.log(this.categoriaList);

    });
  }

}
