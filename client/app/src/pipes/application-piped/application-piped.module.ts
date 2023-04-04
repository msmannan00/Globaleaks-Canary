import { NgModule } from '@angular/core';
import {PipedTranslationPipe} from "../PipedTranslationPipe";

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [
    PipedTranslationPipe
  ],
  exports: [
    PipedTranslationPipe
  ]
})
export class ApplicationPipedModule {}
