import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule} from "./views/app.module";



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
