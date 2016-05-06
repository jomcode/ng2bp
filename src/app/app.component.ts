import { Component } from '@angular/core';

@Component({
  selector: 'sg-app',
  template: require('./app.component.html')
})
class AppComponent {
  pageTitle: string = 'App Component';
}

export { AppComponent };
