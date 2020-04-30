import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TableComponent } from './table/table.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule } from 'ng2-charts';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppMapComponent } from './app-map/app-map.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryApiService } from './in-memory-api.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { KeycloakAngularModule, KeycloakService, KeycloakOptions } from 'keycloak-angular';
import { SpringbootComponent } from './springboot/springboot.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { TagCloudModule } from 'angular-tag-cloud-module';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HomeComponent,
    HeaderComponent,
    BreadcrumbComponent,
    ChartsComponent,
    SidebarComponent,
    AppMapComponent,
    SpringbootComponent,
    AnalysisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    TypeaheadModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    ChartsModule,
    DeviceDetectorModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    // _env defined in assets/js/env.js
    NgxMapboxGLModule.withConfig({
      accessToken: window['_env'].mapboxToken
    }),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryApiService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true
    }),
    KeycloakAngularModule,
    TagCloudModule
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {

    if (window['_env'].keycloak.enabled === 'true') {
      const options: KeycloakOptions = {
        config: {
          realm: window['_env'].keycloak.realm,
          url: window['_env'].keycloak.url,
          clientId: window['_env'].keycloak.id
        },
        initOptions: {
          onLoad: 'login-required'
        }
      };

      keycloakService
        .init(options)
        .then(() => {
          console.log('[ngDoBootstrap] keycloak init complete');
          appRef.bootstrap(AppComponent);
        })
        .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
    } else {
      console.log('[ngDoBootstrap] keycloak is not enabled');
      appRef.bootstrap(AppComponent);
    }
  }
}
