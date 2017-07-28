import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { CodeComponent } from './code.component';
import { CodeRoutingModule } from './code.routing';

@NgModule({
  imports: [
    CommonModule,

    /*=== APP MODULES ===*/
    CodeRoutingModule,
    CoreModule,
    SharedModule,
  ],
  declarations: [CodeComponent],
})
export class CodeModule { }
