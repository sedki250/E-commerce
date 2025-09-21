import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

import { setHeaderInterceptor } from './core/interceptor/header/set-header-interceptor';
import { errMsgInterceptor } from './core/interceptor/messageError/err-msg-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptor/globalLoading/loading-interceptor';
import {provideTranslateService} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
     NgxSpinnerModule,
    provideToastr(),
    provideHttpClient(withFetch(),withInterceptors([setHeaderInterceptor,errMsgInterceptor,loadingInterceptor])),
    importProvidersFrom([CookieService]),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    
  ]
};
