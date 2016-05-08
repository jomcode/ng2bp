import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('App', () => {
  beforeEachProviders(() => [ AppComponent ]);

  it('should have a pageHeading', inject([ AppComponent ], (app) => {
    expect(app.pageHeading).toEqual('AppComponent');
  }));
});
