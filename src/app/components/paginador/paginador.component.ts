import { Component, OnInit, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {

  @Input() paginator:any;
  paginas: number[];

  desde:number;
  hasta:number;

  constructor() { }

  ngOnInit() {
    this.initPaginator()

  }
  
  ngOnChanges(changes:SimpleChanges){
    let paginatorActualizado= changes['paginator'];
    if (paginatorActualizado.previousValue) {
      this.initPaginator();
    }
    
  }
  private initPaginator():void{
    this.desde = Math.min(Math.max(1,this.paginator.number-5),this.paginator.totalPages-6);
    this.hasta = Math.max(Math.min(this.paginator.totalPages,this.paginator.number+5),7);

    if (this.paginator.totalPages>6) {
      this.paginas =new Array(this.hasta - this.desde + 1).fill(0).map((_valor,indice) => indice + this.desde);
      
    }else{
      this.paginas =new Array(this.paginator.totalPages).fill(0).map((_valor,indice) => indice +1);
      
    }
  }

}
