import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/AppComponent';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js/node';


export default function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes)]
  });
}
