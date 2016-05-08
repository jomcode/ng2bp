import { Component } from '@angular/core';

@Component({
  selector: 'sg-app',
  styles: [
    require('./app.component.scss')
  ],
  template: require('./app.component.html'),
})
class AppComponent {
  public pageHeading: string = 'AppComponent';
}

export { AppComponent };
