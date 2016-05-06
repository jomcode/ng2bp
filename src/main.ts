import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';

function main(initialHmrState?: any): Promise<any> {
  return bootstrap(AppComponent)
  .catch(err => console.error(err));
}

if (process.env.NODE_ENV === 'development') {
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
}
else {
  if (process.env.NODE_ENV === 'production') enableProdMode();
  document.addEventListener('DOMContentLoaded', () => main());
}
