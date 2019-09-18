import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { EsqueciSenhaPage } from './esqueci-senha.page';
import { SharedModule } from '../../core/shared/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: EsqueciSenhaPage
  }
];

@ NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EsqueciSenhaPage]
})
export class EsqueciSenhaPageModule {}
