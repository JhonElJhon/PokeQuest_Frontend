import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import routeConfig from './app/routes';
import { JwtInterceptor } from './app/services/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig), provideHttpClient(), {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
}).catch((err) => console.error(err));