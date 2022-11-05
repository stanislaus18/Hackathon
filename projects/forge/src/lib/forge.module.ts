import { NgModule } from '@angular/core';
import { ForgeComponent } from './forge.component';
import { ViewerModule } from 'ng2-adsk-forge-viewer';
import { CommonModule } from '@angular/common';
import { ForgeService } from './forge.service';


@NgModule({
  declarations: [
    ForgeComponent
  ],
  imports: [
    CommonModule,
    ViewerModule
  ],
  providers: [ForgeService],
  exports: [
    ForgeComponent
  ]
})
export class ForgeModule { }
