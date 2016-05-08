import { Component } from '@angular/core';

@Component({
  selector: 'sg-app',
  template: require('./app.component.html'),
  styles: [
    require('./app.component.scss')
  ]
})
class AppComponent {
  pageHeading: string = 'AppComponent';
}

export { AppComponent };
