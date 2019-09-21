import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProdutosService } from '../shared/produtos.service';

@ Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {
  produtos: Observable<any[]>;
  categorias: Observable<any[]>;
  categoriasSelecionada: string;

  constructor(private router: Router,
              private produtosService: ProdutosService) { }

  ngOnInit() {
    this.produtos = this.produtosService.getAll();
    this.categorias = this.produtosService.getCategoriasAll();
  }

  buscarProdutos(){
    this.produtos = this.produtosService.getAll(this.categoriasSelecionada);
  }

  adicionarProduto(produtoKey: string){
    this.router.navigate(['pedido/carrinho/novo-item', produtoKey]);
  }

}
