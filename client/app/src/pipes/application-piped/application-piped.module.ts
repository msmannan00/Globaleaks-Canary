import { NgModule } from '@angular/core';
import {TranslatePipe} from "../translate";

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [
    TranslatePipe
  ],
  exports: [
    TranslatePipe
  ]
})
export class ApplicationPipedModule {}
