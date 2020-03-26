import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'
import { ProductListComponent } from './product-list.component';
import { ProductDetailGuard } from './product-detail.guard';
import { ProductDetailComponent } from './product-detail.component';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { ProductDetailResolverService } from './resolvers/product-detail-resolver.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'products',component:ProductListComponent,
      resolve:{resolveProducts:ProductResolverService}},
      {path:'product/:id',
      canActivate:[ProductDetailGuard],
      component:ProductDetailComponent,
      resolve:{resolveProdDetail:ProductDetailResolverService}
     },
    ])
  ],
  exports:[RouterModule]
})
export class ProductRoutingModule { }


