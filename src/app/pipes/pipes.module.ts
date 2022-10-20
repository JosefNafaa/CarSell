import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstCharUpperCasePipe } from './first-char-upper-case.pipe';
import { SafeUrlPipe } from './safe-url.pipe';



@NgModule({
  declarations: [FirstCharUpperCasePipe, SafeUrlPipe],
  imports: [
    CommonModule
  ],
  exports:[
    FirstCharUpperCasePipe,
    SafeUrlPipe
  ]
})
export class PipesModule { }
