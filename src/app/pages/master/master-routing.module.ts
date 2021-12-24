import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenggunaComponent } from "./pengguna/pengguna.component";
import { MBarangComponent } from "./m-barang/m-barang.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {
    path: 'pengguna',
    component: PenggunaComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'barang',
    component: MBarangComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
