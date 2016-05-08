import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';

function main(initialHmrState?: any): Promise<any> {
  return bootstrap(AppComponent)
  .catch((err: any) => console.error(err));
}

if (process.env.NODE_ENV === 'development' && process.env.HMR === 'enabled') {
  let ngHmr: any = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
}
else {
  if (process.env.NODE_ENV === 'production') enableProdMode();
  document.addEventListener('DOMContentLoaded', () => main());
}
