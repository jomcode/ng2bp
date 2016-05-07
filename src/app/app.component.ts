import { Component } from '@angular/core';

@Component({
  selector: 'sg-app',
  template: require('./app.component.html'),
  styles: [
    require('./app.component.css')
  ]
})
class AppComponent {
  pageTitle: string = 'App Component';
}

export { AppComponent };
